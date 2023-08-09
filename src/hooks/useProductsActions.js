import { useDispatch } from 'react-redux'
import {
  add_cart_product,
  add_cart_product_quantity,
  delete_cart_product,
  remove_cart_product_quantity,
  get_cart_products,
  get_main_products,
  fetch_cart_product_quantity,
  fetch_add_product_to_cart,
  fetch_remove_product_to_cart
} from '../store/products/slice'

export function useProductsActions () {
  const dispatch = useDispatch()

  const addCartProduct = (product) => { dispatch(add_cart_product({ product })) }
  const deleteCartProduct = productId => { dispatch(delete_cart_product({ productId })) }
  const addCartProductQuantity = productId => { dispatch(add_cart_product_quantity({ productId })) }
  const removeCartProductQuantity = productId => { dispatch(remove_cart_product_quantity({ productId })) }

  const getCartProducts = (token, refetch = false) => { dispatch(get_cart_products({ token, refetch })) }
  const getMainProducts = ({ filter, refetch }) => { dispatch(get_main_products({ filter, refetch })) }

  const fetchCartProductQuantity = ({ id, quantity, token }) => { dispatch(fetch_cart_product_quantity({ id, quantity, token })) }
  const fetchAddProductToCart = async ({ product, token, amount }) => dispatch(fetch_add_product_to_cart({ product, token, amount }))
  const fetchRemoveProductToCart = async ({ id, token }) => dispatch(fetch_remove_product_to_cart({ id, token }))

  return {
    getCartProducts,
    getMainProducts,
    addCartProduct,
    deleteCartProduct,
    addCartProductQuantity,
    removeCartProductQuantity,
    fetchCartProductQuantity,
    fetchAddProductToCart,
    fetchRemoveProductToCart
  }
}
