import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLayoutActions } from '../../../hooks/useLayoutActions'
import { useProductsActions } from '../../../hooks/useProductsActions'
import { Spinner } from '../../common/spinner'
import { CartHeader } from './cart-header'
import { CartFooter } from './cart-footer'
import { CartProduct } from '../../product/cart-product'

export function Cart () {
  const { cart } = useSelector(s => s.layout)
  const { open, animating } = cart

  const { closeCart } = useLayoutActions()
  const { getCartProducts } = useProductsActions()

  const { token } = useSelector(s => s.user)
  const { cart: { loading, products } } = useSelector(s => s.products)

  useEffect(() => {
    if (!open) return
    getCartProducts(token)
  }, [open])

  return <div id='cartContainer'>
    {
      open && (

        <div
          id='modalBackground'
          className={`${animating ? 'bg-black/5 pointer-events-auto' : 'transparent pointer-events-none'}
          fixed top-0 left-0 w-full h-full flex overflow-hidden justify-end items-end z-100 transition-colors duration-500`}
          onClick={closeCart}
        >

          <div id='cart' onClick={e => e.stopPropagation()} className={`${animating ? '' : 'translate-x-full'}
          h-[calc(100%-60px)] w-[300px] bg-white transition-transform duration-500 relative shadow-2xl flex flex-col`}>

            <CartHeader />

            <div className='flex-1 flex flex-col px-5 gap-y-20 overflow-auto pb-10 custom-scrollbar'>
              {
                products.map(product => <CartProduct key={product.id} {...product} />)
              }
            </div>

            <CartFooter products={products} getCartProducts={getCartProducts} />

            {
              loading
                ? <div className='absolute top-0 left-0 w-full h-full bg-neutral-200 text-neutral-600 flex justify-center items-center'>
                <Spinner style={{ height: 40, width: 40 }} />
              </div>
                : null
            }

          </div>

        </div>
      )
    }
  </div>
}
