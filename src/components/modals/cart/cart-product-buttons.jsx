import { useSelector } from 'react-redux'
import { MinusIcon } from '../../icons/minus'
import { PlusIcon } from '../../icons/plus'
import { useProductsActions } from '../../../hooks/useProductsActions'

export function CartProductButtons ({ id, quantity }) {
  const { token } = useSelector(s => s.user)
  const { addCartProductQuantity, removeCartProductQuantity, fetchCartProductQuantity, deleteCartProduct } = useProductsActions()

  const handleAddClick = () => {
    addCartProductQuantity(id)
    fetchCartProductQuantity({ id, quantity: quantity + 1, token })
  }
  const handleRemoveClick = () => {
    removeCartProductQuantity(id)
    if (quantity <= 1) {
      deleteCartProduct(id)
      return
    }
    fetchCartProductQuantity({ id, quantity: quantity - 1, token })
  }

  return <div className="flex [&>button]:text-xl [&>button]:py-[4px] [&>button]:px-1 [&>*]:border [&>*]:border-neutral-200">

    <button onClick={handleRemoveClick}><MinusIcon className='h-5 w-5' /></button>
    <div className='px-4 flex items-center'>
      <span>{quantity}</span>
    </div>
    <button onClick={handleAddClick}><PlusIcon className='h-5 w-5' /></button>

  </div>
}
