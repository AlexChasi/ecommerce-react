import { useSelector } from 'react-redux'
import { usePurchasesActions } from '../../../hooks/usePurchasesActions'
import { useProductsActions } from '../../../hooks/useProductsActions'

export function CartFooter ({ products }) {
  // let totalPrice = 0

  // for (let i = 0; i < products.length; i++) {
  //   const actualProduct = products[i]
  //   totalPrice += actualProduct.product.price
  // }

  // ^ Fue la primer forma que hice pero me estaba preguntando si había alguna forma de hacerlo con un metodo nativo de los arrays
  // y chatGPT me ayudó dandome esto, primero se mapea el array de productos para devolver solo los precios y después se suman todos en el reducer
  const totalPrice = products.length >= 1 ? products.map(el => Number(el.product.price) * Number(el.quantity)).reduce((acc, act) => acc + act) : ''

  const { token } = useSelector(s => s.user)
  const { purchaseProduct } = usePurchasesActions()
  const { getCartProducts } = useProductsActions()

  const handleClick = async () => {
    purchaseProduct(token)

    await new Promise(resolve => setTimeout(resolve, 300))

    // Hago esto porque sino aveces no se refresca...
    getCartProducts(token, true)
  }

  return <footer className="flex flex-col border-t border-neutral-300 py-7 px-3">
    <div className="flex justify-between">
      <span className="text-neutral-300">Total:</span>
      <p className="text-lg font-bold text-neutral-500">$ {totalPrice}</p>
    </div>
    <button onClick={handleClick} className="py-2 w-full bg-rose-500 text-white mt-4">Checkout</button>

  </footer>
}
