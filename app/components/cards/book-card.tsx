import { BookProps } from '~/types'
import { Button } from '@components/ui/button'
import { Heart, ShoppingBag } from 'lucide-react'
import { formatPriceToUSD } from '@lib/utils'
import { useFetchAction } from '~/hooks/use-global-submit'
import { AnimatedCircularProgressBarDemo } from '../ui/progress'

export const BookCard: React.FC<BookProps> = (book) => {
  const { sendAction, isLoading } = useFetchAction();

  // Add product to carts
  const handleAddToCart = () => {
    const formData = new FormData();
    formData.append('productId', book._id.toString());
    formData.append('quantity', '1');
    sendAction(formData, 'post', '/api/cart/add-product');
  };

  return (
    <div className='border border-zinc-100 min-w-72 rounded-lg py-6 bg-white h-full flex flex-col flex-grow'>
      <a href={`/products/${book._id}`} className="h-48 w-full">
        <img
          alt={book.title}
          src={book.images[0]}
          className="h-full w-auto rounded-md mx-auto"
        />
      </a>

      <div className='mt-6 px-6 flex flex-col relative justify-between h-full'>
        <div>
          <div className='flex items-center justify-between gap-4'>
            <a href={`/products/${book._id}`}>
              <h2 className='text-zinc-900 line-clamp-2 font-medium text-md text-start leading-5'>
                {book.title}
              </h2>
              <div className='text-zinc-400 text-xs leading-5 font-light'>by {book.author} </div>
            </a>

            <Button variant="outline" size='icon' className='size-10 flex-shrink-0'>
              <Heart className='size-4 text-zinc-600' />
            </Button>
          </div>

          <div className='text-md font-semibold text-zinc-900 mt-2'>
            {formatPriceToUSD(book.price)}
          </div>
        </div>

        <Button onClick={handleAddToCart} className='w-full sticky mt-6'> <ShoppingBag strokeWidth={1} className='text-white size-5' /> Add to cart</Button>
      </div>
    </div>
  )
}

// {isLoading && (
//   <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center'>
//     {/* Yükleme spinner'ı */}
//     <AnimatedCircularProgressBarDemo isLoading={isLoading} />
//   </div>
// )}