import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { USER_POSSIBLE_STATES } from '../../store/user/slice'

export function ProtectedRoute ({ children }) {
  const user = useSelector(s => s.user)

  const navigate = useNavigate()

  console.log(user)

  useEffect(() => {
    if (user.logged === USER_POSSIBLE_STATES.LOGGED || user.logged === USER_POSSIBLE_STATES.NOT_KNOWN) return
    navigate('/login', { replace: true })
  }, [user])

  return children
}
