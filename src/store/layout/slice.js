import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/*
    La razón por la cual hago esto es para poder hacer que la cart no esté abierta siempre, y a la vez agregar una animación cuando
    se cierra y se abre, la implementación está en el carrito y en filters
*/

let closeTimeoutId
let closeTimeoutFilterId

export const close_cart = createAsyncThunk('layout/close_cart', async (_, thunkAPI) => {
  thunkAPI.dispatch(layoutSlice.actions.set_cart_animating(false))
  await new Promise((resolve) => { closeTimeoutId = setTimeout(resolve, 505) })

  thunkAPI.dispatch(layoutSlice.actions.set_cart_open(false))
})
export const open_cart = createAsyncThunk('layout/open_cart', async (_, thunkAPI) => {
  if (closeTimeoutId) { clearTimeout(closeTimeoutId); console.log('borrado') }

  thunkAPI.dispatch(layoutSlice.actions.set_cart_open(true))
  await new Promise((resolve) => setTimeout(() => {
    thunkAPI.dispatch(layoutSlice.actions.set_cart_animating(true))
    resolve()
  }, 10))
})
export const close_filters = createAsyncThunk('layout/close_filters', async () => {
  return await new Promise((resolve) => { closeTimeoutFilterId = setTimeout(resolve, 505) })
})
export const open_filters = createAsyncThunk('layout/open_filters', async (_, thunkAPI) => {
  if (closeTimeoutFilterId) { clearTimeout(closeTimeoutFilterId) }
  await new Promise((resolve) => setTimeout(resolve, 10))
})

const initialState = {

  filters: {
    animating: false,
    open: false
  },
  cart: {
    open: false,
    animating: false
  }

}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {

    set_cart_animating: (state, action) => {
      state.cart.animating = action.payload
    },
    set_cart_open: (state, action) => {
      state.cart.open = action.payload
    }

  },
  extraReducers: (builder) => {
    builder.addCase(close_filters.pending, (state) => {
      state.filters.animating = false
    })
    builder.addCase(close_filters.fulfilled, (state) => {
      state.filters.open = false
    })
    builder.addCase(open_filters.pending, (state) => {
      state.filters.open = true
    })
    builder.addCase(open_filters.fulfilled, (state) => {
      state.filters.animating = true
    })
  }
})

export default layoutSlice.reducer
