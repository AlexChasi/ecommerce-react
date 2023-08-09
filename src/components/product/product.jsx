import { Link, useNavigate } from 'react-router-dom'
import { CartIcon } from '../icons/cart'
import { useSelector } from 'react-redux'
import { USER_POSSIBLE_STATES } from '../../store/user/slice'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { useProductsActions } from '../../hooks/useProductsActions'

export function Product ({ product }) {
  const user = useSelector(s => s.user)
  const { cart } = useSelector(s => s.products)
  const navigate = useNavigate()

  const { openCart } = useLayoutActions()
  const { fetchAddProductToCart } = useProductsActions()

  const handleClick = e => {
    if (user === USER_POSSIBLE_STATES.NOT_KNOWN) return
    if (user === USER_POSSIBLE_STATES.NOT_LOGGED) navigate('/login')
    if (cart.products.some(el => el.product.id === product.id)) return

    fetchAddProductToCart({ token: user.token, product })
      .then(openCart)
  }

  return <article className="border border-neutral-300 rounded-lg relative">

    <Link to={`/products/${product.id}`}>
      <header className="h-[250px] flex items-center justify-center">
        <img src={product.images[0].url} height={200} className="h-4/5 w-4/5 object-contain block" />
      </header>
      <footer className='px-5 py-5 pb-7 flex flex-col text-xl text-neutral-600'>

        <span className='font-bold text-neutral-300'>{product.brand}</span>
        <strong className='pl-4 font-bold'>{product.title}</strong>
        <span className='text-neutral-300 block mt-auto'>Price</span>
        <strong className='pl-4'>{product.price}</strong>

      </footer>
    </Link>

    <button onClick={handleClick} className='bg-rose-600 rounded-full p-3 absolute bottom-8 right-5'>
      <CartIcon className='h-7 w-7 text-white' strokeWidth={2} />
    </button>
  </article>
}
