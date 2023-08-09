import { useEffect } from 'react'
import { Linking } from '../components/layout/linking'
import { usePurchasesActions } from '../hooks/usePurchasesActions'
import { useSelector } from 'react-redux'
import { PurchasedProduct } from '../components/product/purchased-product'
import { Spinner } from '../components/common/spinner'

export function Purchases () {
  const { products, loading } = useSelector(s => s.purchases)
  const { token } = useSelector(s => s.user)

  const { getPurchasesProducts } = usePurchasesActions()

  useEffect(() => {
    if (products.length >= 1 || !token) return
    getPurchasesProducts(token)
  }, [token])

  console.log({ ...products })

  return <main className="flex flex-col max-w-xl mx-auto w-full py-3 px-5 text-neutral-600">
    <Linking pageName='Purchases' />
    <h1 className='text-2xl font-bold mt-4'>My Purchases</h1>
    <div className='flex flex-col relative flex-1 mt-12 gap-6' id='purchases-container'>
      {
        products.map(el => <PurchasedProduct key={el.id} {...el} />)
      }
      {
        loading && <div className='absolute top-0 left-0 w-full h-full text-neutral-600 flex justify-center items-center'>
          <Spinner style={{ height: 40, width: 40 }} />
        </div>
      }
    </div>

  </main>
}
