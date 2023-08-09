import { useState } from 'react'
import { DownArrowIcon } from '../icons/downArrow'

export function FilterHeader ({ children, name }) {
  const [visible, setVisible] = useState(true)

  return <div className='w-full flex flex-col'>
    <button onClick={() => { setVisible(prev => !prev) }} className="border-b-2 border-neutral-300 text-start text-lg font-semibold text-neutral-500 flex justify-between pb-1 items-center">
      <span>{name}</span>
      <DownArrowIcon className='w-4 h-4 transition-all duration-1000 ease-in-out' strokeWidth={3} style={{ ...(!visible && { transform: 'rotate(180deg)' }) }} />
    </button>

    <div id='filter-body' className={`${visible ? 'max-h-[300px]' : 'max-h-0'} transition-all duration-1000 ease-in-out overflow-hidden`}>
      {children}
    </div>
  </div>
}
