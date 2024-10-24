import { BookCard } from '@components/cards/book-card'
import { ProductSliderProps } from '~/types'
import { useEffect, useRef } from 'react'
import { Button } from '@components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

const ProductSlider: React.FC<ProductSliderProps> = ({ title, browseAllText, browseAllLink, books, className }) => {
  const prevButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Navigation Prev
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  // Navigation Next
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    console.log(books);
  }, [books])

  return (
    <section aria-labelledby="category-heading" className={clsx("flex items-center justify-center py-36", className)}>
      <div className="default-container relative sm:pb-16">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-zinc-900">
            {title}
          </h2>
          {browseAllText &&
            <a href={browseAllLink} className="hidden text-sm font-semibold text-amber-500 hover:text-amber-600 duration-200 sm:block">
              {browseAllText}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          }
        </div>

        <div ref={sliderRef} className="mt-6 lg:pb-2 hide-scroll grid grid-flow-col-dense gap-6 overflow-x-auto max-md:*:w-48 *:w-56">
          {books.map((book) => (
            <BookCard key={book._id?.toString()} {...book} />
          ))}
        </div>

        {
          browseAllText &&
          <div className="mt-6 sm:hidden">
            <a href={browseAllLink} className="block text-sm font-semibold text-amber-600 hover:text-amber-500">
              {browseAllText}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        }

        {/* Navigation */}
        <div className='lg:flex items-center gap-2.5 justify-end absolute bottom-0 right-8 hidden'>
          <Button onClick={handlePrev} ref={prevButtonRef} variant="outline" size="icon"><ChevronLeft className='size-5' /></Button>
          <Button onClick={handleNext} ref={nextButtonRef} variant="outline" size="icon"><ChevronRight className='size-5' /></Button>
        </div>
      </div>
    </section>
  )
}

export default ProductSlider