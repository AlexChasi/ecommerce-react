import { useEffect, useState } from 'react'
import { endpoints } from '../../utils/endpoints'
import { Product } from '../product/product'

export function ProductSuggestions ({ categoryId }) {
  const [items, setItems] = useState(null)

  useEffect(() => {
    fetch(endpoints.products + `?categoryId=${categoryId}`)
      .then(res => res.json())
      .then(setItems)
  }, [categoryId])

  return <section className='mt-10 flex flex-col gap-y-10 mb-12'>
    <strong className='text-rose-500 font-bold text-lg'>Discover similar items</strong>

    <div className="gap-10 grid grid-cols-[repeat(auto-fit,_minmax(280px,1fr))]">

      {
        items && items.slice(0, 4).map(el => (
          <div key={el.id} className=''>
            <Product product={el} />
          </div>
        ))
      }

    </div>
  </section>
}
