import { useEffect, useState } from 'react'
import { FilterHeader } from './filter-header'
import { endpoints } from '../../utils/endpoints'
import { useProductsActions } from '../../hooks/useProductsActions'

export function CategoryFilter () {
  const [categories, setCategories] = useState([])

  const { getMainProducts } = useProductsActions()

  useEffect(() => {
    fetch(endpoints.categories)
      .then(res => res.json())
      .then(setCategories)
  }, [])

  const handleClick = category => {
    getMainProducts({ filter: { name: 'categoryId', value: category }, refetch: true })
  }

  return <FilterHeader name='Category'>
    <div className='flex flex-col pl-3 pt-2'>
      {
        categories.map(el => <button key={el.id} onClick={() => handleClick(el.id)} className='text-start py-[6px] text-neutral-600'>{el.name}</button>)
      }
    </div>
  </FilterHeader>
}
