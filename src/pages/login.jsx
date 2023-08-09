import { Link, useNavigate } from 'react-router-dom'
import { LoginInput } from '../components/common/login-input'
import { EmailIcon } from '../components/icons/email'
import { LockIcon } from '../components/icons/lock'
import { endpoints } from '../utils/endpoints'
import { useEffect, useState } from 'react'
import { useUserActions } from '../hooks/useUserActions'
import { useSelector } from 'react-redux'
import { USER_POSSIBLE_STATES } from '../store/user/slice'
import { Spinner } from '../components/common/spinner'

const inputs = [
  { type: 'email', text: 'Email', placeholder: '', name: 'email', id: 'email' },
  { type: 'password', text: 'Password', placeholder: '', name: 'password', id: 'password' }
]

export function Login () {
  const [status, setStatus] = useState({
    type: null,
    message: null
  })

  const user = useSelector(s => s.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.logged === USER_POSSIBLE_STATES.NOT_LOGGED || user.logged === USER_POSSIBLE_STATES.NOT_KNOWN) return
    navigate('/')
  }, [user])

  const { loginUser } = useUserActions()

  const handleSubmit = e => {
    e.preventDefault()

    const credentials = Object.fromEntries(new FormData(e.target))
    if (!credentials.email || !credentials.password) return

    setStatus({ type: 'loading' })

    fetch(endpoints.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 401) throw new Error('Invalid Credentials')
        if (!res.ok) throw new Error('Something went wrong :(')
        return res.json()
      })
      .then(json => {
        const { user, token } = json
        const { firstName, lastName } = user
        const name = `${firstName} ${lastName}`

        loginUser({ name, token })
      })
      .catch(err => {
        const message = err instanceof Error ? err.message : 'Something went wrond :('
        setStatus({ type: 'error', message })
      })
  }

  return <main className="bg-neutral-100 flex justify-center items-center py-8">

    <form onSubmit={handleSubmit} className="bg-white flex flex-col rounded-lg p-5 py-7 max-w-[400px] overflow-hidden w-full text-neutral-800 relative">
      <h1 className='text-2xl mb-7 font-normal text-neutral-600'>Welcome! Enter your email and password to continue</h1>

      <div id='test-box' className="flex flex-col bg-emerald-100 rounded-lg gap-y-2 p-2 pb-4">
        <p className="text-center font-semibold text-neutral-600 text-lg">Test data</p>
        <div className="flex items-center gap-x-2">
          <EmailIcon className='h-5 w-5' />
          <p>john@gmail.com</p>
        </div>
        <div className="flex items-center gap-x-2">
          <LockIcon className='h-5 w-5' />
          <p>john1234</p>
        </div>
      </div>

      <div id='inputs-container' className='flex flex-col gap-y-3 mt-5'>

        {
          inputs.map(el => <LoginInput key={el.id} {...el} />)
        }

        {
          status.type === 'error' && <span className='my-2'>{status.message}</span>
        }

        <button type='submit' disabled={status.type === 'loading'} className='bg-rose-500 text-white py-2 mt-2'>Login</button>

      </div>

      <p className='mt-5 text-sm'>Don&#39;t have an account? <Link className='text-blue-400' to='/register'>Sign up</Link></p>

      {
        status.type === 'loading' && <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-400/20'>
          <Spinner style={{ height: 40, width: 40 }} />
        </div>
      }

    </form>

  </main>
}
