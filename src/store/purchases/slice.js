import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../../utils/endpoints'

export const get_purchases_products = createAsyncThunk('purchases/get_purchases_products', async ({ token }, api) => {
  const response = await fetch(endpoints.purchases, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data
})

export const purchase_product = createAsyncThunk('purchases/purchase_product', async ({ token }) => {
  return await fetch(endpoints.purchases, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})

const initialState = {
  products: [],
  loading: false,
  error: null
}

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_purchases_products.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(get_purchases_products.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(get_purchases_products.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(purchase_product.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(purchase_product.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(purchase_product.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default purchasesSlice.reducer
