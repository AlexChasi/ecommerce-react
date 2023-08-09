export function ProductTitle ({ brand, title }) {
  return <div className='flex flex-col'>
    <span className='text-neutral-300 text-lg'>{brand}</span>
    <h1 className='pl-4 font-bold text-2xl'>{title}</h1>
  </div>
}
