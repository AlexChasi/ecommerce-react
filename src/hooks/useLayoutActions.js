import { useDispatch } from 'react-redux'
import { close_cart, open_cart, open_filters, close_filters } from '../store/layout/slice'

export function useLayoutActions () {
  const dispatch = useDispatch()

  const openCart = () => { dispatch(open_cart()) }
  const closeCart = () => { dispatch(close_cart()) }

  const openFilters = () => { dispatch(open_filters()) }
  const closeFilters = () => { dispatch(close_filters()) }

  return { openCart, closeCart, openFilters, closeFilters }
}
