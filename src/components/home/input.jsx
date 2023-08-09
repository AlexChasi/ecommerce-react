import { useProductsActions } from '../../hooks/useProductsActions'
import { SearchIcon } from '../icons/search'

export function Input () {
  const { getMainProducts } = useProductsActions()

  const handleSubmit = e => {
    e.preventDefault()
    const { title } = Object.fromEntries(new FormData(e.target))
    getMainProducts({ filter: { name: 'title', value: title }, refetch: true })
  }

  return <form className="flex w-full px-1 mb-6" onSubmit={handleSubmit}>
    <input
     type='text'
     id='title'
     name='title'
     placeholder='What are you looking for?'
     className="py-2 px-4 text-sm placeholder:text-neutral-300 outline-none border border-neutral-300 flex-1"
    />
    <button type='submit' className='bg-rose-600 text-white w-[45px] h-[45px] lg:w-28 flex justify-center items-center'>
      <SearchIcon className='h-5 w-5 cursor-pointer' strokeWidth={2.5} />
    </button>
  </form>
}
