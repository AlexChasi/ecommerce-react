// No llegué a hacer el filtro funcionalmente pero lo hice visualmente

import { FilterHeader } from './filter-header'

export function PriceFilter () {
  return <FilterHeader name='Price'>
    <div className='flex flex-col items-end pl-3 py-6 gap-y-4 text-neutral-600'>

      <div className='flex w-full items-center gap-2 justify-between'>
        <label htmlFor='from'>From</label>
        <input type='text' className='py-[5px] px-2 outline-none bg-white border border-neutral-300 rounded-sm' />
      </div>
      <div className='flex w-full items-center gap-2 justify-between'>
        <label htmlFor='To'>To</label>
        <input type='text' className='py-[5px] px-2 outline-none bg-white border border-neutral-300 rounded-sm' />
      </div>

      <button className='mt-2 bg-rose-600 text-white font-semibold py-[7px] px-4 rounded-md'>Filter Price</button>

    </div>
  </FilterHeader>
}
