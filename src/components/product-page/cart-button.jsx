import { useSelector } from 'react-redux'
import { CartIcon } from '../icons/cart'
import { useProductsActions } from '../../hooks/useProductsActions'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { useNavigate } from 'react-router-dom'
import { USER_POSSIBLE_STATES } from '../../store/user/slice'

export function CartButton ({ product, amount }) {
  const user = useSelector(s => s.user)
  const { cart } = useSelector(s => s.products)
  const { fetchAddProductToCart } = useProductsActions()
  const { openCart } = useLayoutActions()
  const navigate = useNavigate()

  const handleClick = () => {
    if (user === USER_POSSIBLE_STATES.NOT_KNOWN) return
    if (user === USER_POSSIBLE_STATES.NOT_LOGGED) navigate('/login')
    if (cart.products.some(el => el.product.id === product.id)) return

    console.log({ amount })

    fetchAddProductToCart({ token: user.token, product, amount })
      .then(openCart)
  }

  return <button onClick={handleClick} className='col-[1/3] flex justify-center gap-3 bg-rose-500 w-full py-3 text-white text-lg'>
    <span>Add to cart</span>
    <CartIcon className='h-6 w-6 text-white' />
  </button>
}
