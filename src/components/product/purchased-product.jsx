export function PurchasedProduct ({ product, quantity }) {
  return <article className="flex items-center justify-between h-16">

    <div id='image-container' className="w-1/4 h-full flex justify-center">
      <img src={product.images[0].url} alt='Product Image' className="h-full object-cover" />
    </div>

    <div className="w-2/5 text-start text-sm">
      <p>{product.title}</p>
    </div>

    <div className="border border-neutral-200 w-16 text-center">
      <span>{quantity}</span>
    </div>

    <div className="w-[17%] text-center">
      <p>${product.price}</p>
    </div>

  </article>
}
