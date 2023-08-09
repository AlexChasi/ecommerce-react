import { useProductsActions } from '../hooks/useProductsActions'
import { useSelector } from 'react-redux'
import { Input } from '../components/home/input'
import { Product } from '../components/product/product'
import { Aside } from '../components/home/aside'
import { useEffect } from 'react'
import { Spinner } from '../components/common/spinner'
import { FilterIcon } from '../components/icons/filter'
import { useLayoutActions } from '../hooks/useLayoutActions'

export function Home () {
  const { main: { products, loading } } = useSelector(s => s.products)
  const { getMainProducts } = useProductsActions()
  const { openFilters } = useLayoutActions()

  useEffect(() => {
    getMainProducts({ refetch: false })
  }, [])

  return <div id='home' className='flex flex-1 min-h-screen'>
    <Aside />
    <main className='flex flex-col flex-1 lg:px-10'>

      <section className="px-5 py-3 pt-12 flex flex-col">
        <Input />
        <button onClick={openFilters} className='flex ml-auto mr-2 -mt-3 items-center gap-x-2 text-neutral-400 text-md lg:hidden'>
          <FilterIcon className='h-5 w-5' />
          <span>Filters</span>

        </button>

        <div className='mt-10 gap-10 grid grid-cols-[repeat(auto-fit,_minmax(280px,1fr))] relative'>
          {
            products.map(el => <Product key={el.id} product={el} />)
          }
          {
            loading && <div className='absolute top-14 left-0 w-full flex justify-center items-center'>
              <Spinner style={{ height: 40, width: 40 }} />
            </div>
          }
        </div>

      </section>

    </main>
  </div>
}
