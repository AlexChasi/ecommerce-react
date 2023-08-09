import { useEffect, useState } from 'react'
import { Linking } from '../components/layout/linking'
import { endpoints } from '../utils/endpoints'
import { useParams } from 'react-router-dom'
import { ProductQuantity } from '../components/product-page/product-quantity'
import { ProductPrice } from '../components/product-page/product-price'
import { ProductTitle } from '../components/product-page/product-title'
import { ProductImage } from '../components/product-page/product-image'
import { CartButton } from '../components/product-page/cart-button'
import { Spinner } from '../components/common/spinner'
import { ProductSuggestions } from '../components/product-page/product-suggestions'

export function ProductPage () {
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState()
  const [amount, setAmount] = useState(1)

  const handlePlus = () => {
    setAmount(prev => prev + 1)
  }
  const handleMinus = () => {
    if (amount === 1) return
    setAmount(prev => prev - 1)
  }

  const params = useParams()

  useEffect(() => {
    setStatus('loading')
    fetch(endpoints.products + `/${params.id}`)
      .then(res => res.json())
      .then(setProduct)
      .finally(() => setStatus('success'))
  }, [])

  return <main className="flex flex-col max-w-[992px] min-h-screen mx-auto px-[13px] py-1 text-neutral-600 relative">

    <Linking pageName={product ? product.title : ''} />

    {
      product &&
        <>
          <section id='page-body' className='flex flex-col mt-12 md:flex-row'>
            <ProductImage image={product.images[0].url} />

            <div className='flex flex-col gap-y-5 mt-8 md:flex-1'>
              <ProductTitle title={product.title} brand={product.brand} />

              <div className='flex flex-col md:gap-y-6 md:flex-col-reverse'>

              <div className='grid grid-cols-2 grid-rows-2 gap-y-8 mb-6'>

                <ProductPrice price={product.price} />

                <ProductQuantity handleMinus={handleMinus} handlePlus={handlePlus} amount={amount} />

                <CartButton amount={amount} product={product} />

              </div>

              <p>{product.description}</p>

            </div>

          </div>
        </section>

        <ProductSuggestions categoryId={product.categoryId} />
      </>
    }

    {
      status === 'loading' && <div className='h-full w-full absolute top-0 left-0 grid place-content-center z-100'>
        <Spinner style={{ height: 40, width: 40 }} />
      </div>
    }
  </main>
}
