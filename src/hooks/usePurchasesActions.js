import { useDispatch } from 'react-redux'
import { get_purchases_products, purchase_product } from '../store/purchases/slice'

export function usePurchasesActions () {
  const dispatch = useDispatch()

  const getPurchasesProducts = async (token) => { dispatch(get_purchases_products({ token })) }
  const purchaseProduct = async (token) => { dispatch(purchase_product({ token })) }

  return { getPurchasesProducts, purchaseProduct }
}
