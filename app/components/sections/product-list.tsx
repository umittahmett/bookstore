import React from 'react'
import { BookProps, ProductListProps } from '~/types'
import { BookCard } from '@components/cards/book-card'
import { useLocation } from '@remix-run/react'

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const keyword = searchParams.get('keyword')
  return (
    products.length > 0 ?
      <div className="grid justify-between grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 w-full">
        {products.map((product: BookProps, index: number) => (
          <BookCard key={index} {...product} />
        ))
        }
      </div>
      :
      <div className="flex flex-col items-center justify-center w-full h-full p-8 bg-white border rounded-md">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center w-24 h-24 border-2 border-gray-300 rounded-full">
            <FrownIcon className="w-12 h-12 text-gray-300" />
          </div>
          <p className="text-lg font-medium text-center text-gray-600">
            No results found for <span className="font-bold text-gray-800">"{keyword}"</span>.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="inline-block w-2 h-2 mt-1.5 bg-amber-500 rounded-full" />
              <span>Check out the suggestions similar to your search above</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="inline-block w-2 h-2 mt-1.5 bg-amber-500 rounded-full" />
              <span>Prefer more general searches by following spelling rules</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="inline-block w-2 h-2 mt-1.5 bg-amber-500 rounded-full" />
              <span>Select the categories that interest you with the category tree on the left</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="inline-block w-2 h-2 mt-1.5 bg-amber-500 rounded-full" />
              <span>Check out the popular brands and categories below</span>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default ProductList

function FrownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}