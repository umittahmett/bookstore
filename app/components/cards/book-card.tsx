import { BookProps } from '~/types'
import { Button } from '@components/ui/button'
import { formatPriceToUSD } from '@lib/utils'
import { useFetchAction } from '@hooks/use-global-submit'
import { CartPlusIcon } from '@components/ui/vector'

export const BookCard: React.FC<BookProps> = (book) => {
  const { sendAction } = useFetchAction()

  // Add product to cart
  const handleAddToCart = () => {
    const formData = new FormData();
    formData.append('productId', book._id.toString());
    formData.append('quantity', '1');
    sendAction({
      formData: formData,
      method: 'post',
      action: '/api/cart/add-product'
    });
  };

  return (
    <div className='border w-full border-zinc-100 rounded-lg py-3 sm:py-6 bg-white h-full flex flex-col flex-grow relative'>
      <a href={`/products/${book._id}`} className="h-48 w-full px-3">
        <img
          alt={book.title}
          src={book.images[0]}
          className="h-full w-auto rounded-md mx-auto"
        />
      </a>

      <div className='mt-6 px-3 sm:px-6 flex flex-col justify-between h-full'>
        <div>
          <div className='flex items-center justify-between gap-4'>
            <a href={`/products/${book._id}`}>
              <h2 className='text-zinc-900 line-clamp-2 font-medium text-md text-start leading-5'>
                {book.title}
              </h2>
              <div className='text-zinc-400 text-xs leading-5 font-light'>by {book.author} </div>
            </a>
          </div>

          <div className='text-md font-semibold text-zinc-900 mt-2'>
            {formatPriceToUSD(book.price)}
          </div>
        </div>
        <Button onClick={handleAddToCart} variant='outline' className='w-full sticky mt-6'> <CartPlusIcon strokeWidth={1} className='text-zinc-800 size-5' /> Add to cart</Button>
      </div>
    </div>
  )
}