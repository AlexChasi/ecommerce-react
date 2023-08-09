import { createSlice } from '@reduxjs/toolkit'

export const USER_POSSIBLE_STATES = {
  NOT_KNOWN: 0,
  NOT_LOGGED: -1,
  LOGGED: 1
}

const RAW_INITIAL_STATE = {
  logged: USER_POSSIBLE_STATES.NOT_LOGGED,
  name: undefined,
  token: undefined
}

const initialState = (() => {
  const user = JSON.parse(localStorage.getItem('__user__'))
  if (!user) return RAW_INITIAL_STATE

  return { logged: USER_POSSIBLE_STATES.LOGGED, ...user }
})()

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login_user: (state, action) => {
      const { name, token } = action.payload

      state.logged = USER_POSSIBLE_STATES.LOGGED
      state.name = name
      state.token = token
    },
    logout_user: (state, action) => {
      state = initialState
    }
  }
})

export default userSlice.reducer

export const { logout_user, login_user } = userSlice.actions
