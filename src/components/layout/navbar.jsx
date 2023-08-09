import { UserIcon } from '../icons/user'
import { ArchiveIcon } from '../icons/archive'
import { CartIcon } from '../icons/cart'
import { Link, useNavigate } from 'react-router-dom'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { useSelector } from 'react-redux'
import { USER_POSSIBLE_STATES } from '../../store/user/slice'

const entrys = [
  { name: 'user', Icon: UserIcon, href: '' },
  { name: 'archive', Icon: ArchiveIcon, href: '/purchases' }
]

export function Navbar () {
  const { openCart } = useLayoutActions()

  const navigate = useNavigate()
  const user = useSelector(s => s.user)

  const handleCartClick = () => {
    if (user.logged === USER_POSSIBLE_STATES.NOT_KNOWN) return
    if (user.logged === USER_POSSIBLE_STATES.NOT_LOGGED) {
      navigate('/login')
      return
    }
    openCart()
  }

  return <nav className="flex w-full justify-between h-[70px] pl-4">
    <div className='w-full flex fixed lg:border-b border-neutral-300 bg-white z-100'>
      <Link to='/' className='flex items-center'>
        <h1 className="text-red-500 text-2xl lg:text-3xl font-bold my-auto">e-commerce</h1>
      </Link>
      <div id='entrys-container' className='flex flex-1 justify-end'>
        {
          entrys.map(({ name, href, Icon }) => (
            <Link key={name} to={href} className='p-4 lg:py-5 lg:w-1/6 lg:border-l border-neutral-300 flex justify-center'>
              <Icon className='text-neutral-400 h-7 w-7' />
            </Link>
          ))
        }
        <button className='p-4 lg:py-5 lg:w-1/6 lg:border-l border-neutral-300 flex justify-center' onClick={handleCartClick}>
          <CartIcon className='text-neutral-400 h-7 w-7' />
        </button>
      </div>
    </div>
  </nav>
}
