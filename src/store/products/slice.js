import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../../utils/endpoints'

// Bendito chatgpt, porque sólo con la documentación no lo hubiese logrado xD

export const get_main_products = createAsyncThunk('products/get_main_products', async ({ filter, refetch = false }, api) => {
  const state = api.getState()
  const { products, set } = state.products.main

  if (set && !refetch) {
    return products
  }

  const response = await fetch(endpoints.products + '?' + `${filter ? `${filter.name}=${filter.value}` : ''}`)
  const data = await response.json()
  return data
})

export const get_cart_products = createAsyncThunk('products/get_cart_products', async ({ token, refetch = false }, api) => {
  const state = api.getState()
  const { products } = state.products.cart
  if (products.length >= 1 && !refetch) {
    return products
  }

  const response = await fetch(endpoints.cart, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data
})

export const fetch_add_product_to_cart = createAsyncThunk('products/fetch_add_product_to_cart', async ({ product, token, amount = 1 }, api) => {
  const state = api.getState()
  const { products } = state.products.cart

  await fetch(endpoints.cart, {
    method: 'POST',
    body: JSON.stringify({ quantity: amount, productId: product.id }),
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })

  await new Promise(resolve => setTimeout(resolve, 200))
  // Si no hago esto aveces la api no me devuelve bien los datos...

  if (!products) return

  await api.dispatch(get_cart_products({ token, refetch: true }))
})

export const fetch_remove_product_to_cart = createAsyncThunk('products/fetch_remove_product_to_cart', async ({ id, token }, api) => {
  const state = api.getState()
  const { products } = state.products.cart

  await fetch(endpoints.cart + `/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  await new Promise(resolve => setTimeout(resolve, 200))
  // Si no hago esto aveces la api no me devuelve bien los datos...

  if (!products) return

  await api.dispatch(get_cart_products({ token, refetch: true }))
})

export const fetch_cart_product_quantity = createAsyncThunk('products/fetch_cart_product_quantity', async ({ id, token, quantity }, api) => {
  const state = api.getState()
  const { products } = state.products.cart
  if (!products) return

  return await fetch(endpoints.cartQuantity + id, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })
})

const initialState = {
  main: {
    products: [],
    loading: null,
    error: null,
    set: false
  },
  cart: {
    products: [],
    loading: true,
    error: null,
    set: false
  }
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

    delete_cart_product: (state, action) => {
      if (!state.cart.set) return state
      const { productId } = action.payload

      state.cart.products = state.cart.products.filter(el => el.id !== productId)
    },
    add_cart_product: (state, action) => {
      if (!state.cart.set) return state
      const { product } = action.payload

      state.cart.products.push({ product })
    },
    add_cart_product_quantity: (state, action) => {
      if (!state.cart.set) return state

      const { productId } = action.payload
      const index = state.cart.products.findIndex(el => el.id === productId)
      if (index === -1) return state

      const updatedProducts = [...state.cart.products]

      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + 1
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          products: updatedProducts
        }
      }
    },
    remove_cart_product_quantity: (state, action) => {
      if (!state.cart.set) return state

      const { productId } = action.payload
      const index = state.cart.products.findIndex(el => el.id === productId)
      if (index === -1) return state

      const updatedProducts = [...state.cart.products]

      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity - 1
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          products: updatedProducts
        }
      }
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(get_cart_products.pending, (state) => {
        state.cart.loading = true
        state.cart.error = null
      })
      .addCase(get_cart_products.fulfilled, (state, action) => {
        state.cart.loading = false
        state.cart.products = action.payload
        state.cart.set = true
      })
      .addCase(get_cart_products.rejected, (state, action) => {
        state.cart.loading = false
        state.cart.error = action.error.message
      })
      .addCase(get_main_products.pending, (state) => {
        state.main.loading = true
        state.main.error = null
      })
      .addCase(get_main_products.fulfilled, (state, action) => {
        console.log({ productsFromExtra: action.payload })
        state.main.loading = false
        state.main.products = action.payload
        state.main.set = true
      })
      .addCase(get_main_products.rejected, (state, action) => {
        state.main.loading = false
        state.main.error = action.error.message
      })
  }
})

export default productsSlice.reducer

export const { add_cart_product, add_cart_product_quantity, delete_cart_product, remove_cart_product_quantity } = productsSlice.actions
