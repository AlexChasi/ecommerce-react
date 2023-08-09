import { MinusIcon } from '../icons/minus'
import { PlusIcon } from '../icons/plus'

export function ProductQuantity ({ amount, handlePlus, handleMinus }) {
  return <div className='flex flex-col'>
    <span className='text-neutral-300 block mt-auto text-[17px]'>Quantity</span>

    <div className="flex items-end [&>button]:text-xl [&>button]:py-[4px] [&>button]:px-1 [&>*]:border [&>*]:border-neutral-200">

      <button onClick={handleMinus}><MinusIcon className='h-5 w-5' /></button>
      <div className='px-4 flex items-center h-[30px]'>
        <span>{amount}</span>
      </div>
      <button onClick={handlePlus}><PlusIcon className='h-5 w-5' /></button>

    </div>

  </div>
}
