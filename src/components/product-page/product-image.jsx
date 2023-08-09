export function ProductImage ({ image }) {
  return <div id='image-container' className='w-full flex justify-center px-12 mb-5 md:flex-[.9] h-[350px]'>
    <img src={image} height={280} className='object-contain px-5' alt='Product Image' />
  </div>
}
