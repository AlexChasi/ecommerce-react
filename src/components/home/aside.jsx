import { CategoryFilter } from './category-filter'
import { PriceFilter } from './price-filter'

export function Aside () {
  return <aside className='hidden lg:flex flex-col w-[300px] pt-12 px-5 pb-5'>
    <div className='sticky top-[95px] w-[calc(300px-2.5rem)] flex flex-col gap-y-6'>
      <PriceFilter />
      <CategoryFilter />
    </div>
  </aside>
}
