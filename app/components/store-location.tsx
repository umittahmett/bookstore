import React from 'react'
import { Button } from './ui/button'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { StoreLocationProps } from '~/types'
import { Store } from 'lucide-react'

const StoreLocation: React.FC<StoreLocationProps> = ({ name, google_maps_link, address, phone }) => {
  return (
    <a href={google_maps_link} className='flex group items-center justify-start w-full gap-4 rounded-xl border border-zinc-200 text-zinc-900 py-4 px-4'>
      <Store strokeWidth='1px' className='size-8 text-amber-500' />
      <div className='flex items-center justify-between w-full gap-5'>
        <div>
          <a className='text-lg mb-2 duration-200 hover:text-zinc-900 group-hover:underline' href={google_maps_link}><span className='text-zinc-900'>{name}</span>, <span className='text-zinc-700'>{address}</span></a>
          <div className='text-zinc-600 text-sm'>Phone: <a className='hover:underline text-zinc-400 duration-200 hover:text-zinc-900' href={`tel:${phone}`}>{phone}</a></div>
        </div>
        <Button variant='outline' size="icon">
          <ArrowTopRightIcon className='size-5 text-black' />
        </Button>
      </div>
    </a>
  )
}

export default StoreLocation