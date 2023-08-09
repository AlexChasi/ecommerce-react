import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/slice'
import layoutReducer from './layout/slice'
import productsReducer from './products/slice'
import purchasesReducer from './purchases/slice'

const persistanceLocalStorageMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }

  next(action)

  if (action.type === 'user/login_user') {
    const state = store.getState()
    console.log({ state })
    localStorage.setItem('__user__', JSON.stringify(state.user))
  }
  if (action.type === 'user/logout_user') {
    localStorage.removeItem('__user__')
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    products: productsReducer,
    purchases: purchasesReducer
  },
  middleware: [persistanceLocalStorageMiddleware]
})
