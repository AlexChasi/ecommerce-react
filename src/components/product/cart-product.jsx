import { useSelector } from 'react-redux'
import { useProductsActions } from '../../hooks/useProductsActions'
import { CartProductButtons } from '../modals/cart/cart-product-buttons'
import { DeleteIcon } from '../icons/delete'
export function CartProduct ({ product, quantity, id }) {
  const { token } = useSelector(s => s.user)
  const { fetchRemoveProductToCart } = useProductsActions()

  return <article className="w-full flex">
    <img src={product.images[0].url} className="h-[70px] w-[70px] object-contain block" alt='Product image' />
    <div id='info' className="flex flex-col justify-between w-full ml-2 mt-1">
      <div className="flex justify-between">
        <p className="text-sm text-neutral-700 font-semibold">{product.title}</p>
        <button onClick={() => fetchRemoveProductToCart({ token, id })}><DeleteIcon className='h-4 w-4 text-red-700' /></button>
      </div>
      <div className='flex mb-2 justify-between items-center'>
        <CartProductButtons id={id} quantity={quantity} />
        <p className='text-md font-semibold text-neutral-600'>${product.price}</p>
      </div>
    </div>
  </article>
}
