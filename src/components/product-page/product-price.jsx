export function ProductPrice ({ price }) {
  return <div className='flex flex-col'>
    <span className='text-neutral-300 block mt-auto text-[16px]'>Price</span>
    <strong className='pl-4 text-xl'>$ {price}</strong>
  </div>
}
