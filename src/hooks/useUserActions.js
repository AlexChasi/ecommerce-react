import { useDispatch } from 'react-redux'
import { login_user, logout_user } from '../store/user/slice'

export function useUserActions () {
  const dispatch = useDispatch()

  const loginUser = ({ name, token }) => dispatch(login_user({ name, token }))
  const logoutUser = () => dispatch(logout_user())

  return { loginUser, logoutUser }
}
