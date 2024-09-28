import React from 'react'
import { BookProps } from '~/types'
import { Button } from './ui/button'
import { Heart, LucideShoppingBag, Plus, ShoppingBag, ShoppingBasket } from 'lucide-react'
import { formatPriceToUSD } from '@lib/utils'

export const BookCard: React.FC<BookProps> = (book) => {
  return (
    <div className='border border-zinc-100 min-w-72 rounded-lg py-6 bg-white h-full flex flex-col flex-grow'>
      <div className="h-48 w-full">
        <img
          alt={book.title}
          src={book.cover_image_url}
          className="h-full w-auto rounded-md mx-auto"
        />
      </div>

      <div className='mt-6 px-6 flex flex-col relative justify-between h-full'>
        <div>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <h2 className='text-zinc-900 line-clamp-2 font-medium text-md text-start leading-5'>
                {book.title}
              </h2>
              <div className='text-zinc-400 text-xs leading-5 font-light'>by {book.author} </div>
            </div>

            <Button variant="outline" size='icon' className='size-10 flex-shrink-0'>
              <Heart className='size-4 text-zinc-600' />
            </Button>
          </div>

          <div className='text-md font-semibold text-zinc-900 mt-2'>
            {formatPriceToUSD(book.price)}
          </div>
        </div>

        <Button className='w-full sticky mt-6'> <ShoppingBag strokeWidth={1} className='text-white size-5' /> Add to cart</Button>
      </div>
    </div>
  )
}
