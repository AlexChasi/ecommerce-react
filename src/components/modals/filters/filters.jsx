import { useSelector } from 'react-redux'
import { useLayoutActions } from '../../../hooks/useLayoutActions'
import { PriceFilter } from '../../home/price-filter'
import { CategoryFilter } from '../../home/category-filter'

export function Filters () {
  const { filters } = useSelector(s => s.layout)
  const { open, animating } = filters

  console.log({ open, animating })

  const { closeFilters } = useLayoutActions()

  return <div id='cartContainer'>
    {
      open && (

        <div
          id='modalBackground'
          className={`${animating ? 'bg-black/5 pointer-events-auto' : 'transparent pointer-events-none'}
          fixed top-0 left-0 w-full h-full flex overflow-hidden justify-end items-end z-[110] transition-colors duration-500`}
          onClick={closeFilters}
        >

          <div id='cart' onClick={e => e.stopPropagation()} className={`${animating ? '' : 'translate-x-full'}
          h-[calc(100%-60px)] w-[300px] bg-white transition-transform duration-500 relative shadow-2xl flex flex-col`}>

          <header className="py-4 px-4">
            <h5 className="text-xl font-bold text-neutral-600">Filters</h5>
          </header>

          <div className='flex-1 px-4 gap-y-4 flex flex-col'>
            <PriceFilter />
            <CategoryFilter />
          </div>

          </div>

        </div>
      )
    }
  </div>
}
