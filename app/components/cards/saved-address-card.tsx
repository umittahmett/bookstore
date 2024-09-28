import { Card, CardContent } from '@components/ui/card'
import { AddressProps } from '~/types'
import clsx from 'clsx'

const SavedAddressCard: React.FC<AddressProps> = ({
  name,
  firstName,
  lastName,
  country,
  city,
  zip,
  moreDetailed = false,
  address,
  phone,
  className,
  onClick
}) => {
  return (
    <Card onClick={onClick} className={clsx("bg-zinc-50 h-fit w-full cursor-pointer hover:bg-zinc-100 duration-200", className)}>
      <CardContent className="p-4 flex items-start justify-between flex-col h-full" >
        <div className='*:leading-4 space-y-1.5'>
          <div className="font-semibold mb-3">{name}</div>
          {moreDetailed && <div className='text-zinc-500 text-xs font-light'>{address}</div>}
          {moreDetailed && <div className='text-zinc-500 text-xs font-light'>{phone}</div>}
          <div className='text-zinc-500 text-xs font-light'>{city}, {country}, {zip}</div>
        </div>
        <div className='text-zinc-700 text-xs sticky mt-2'>{firstName} {lastName}</div>
      </CardContent>
    </Card>
  )
}

export default SavedAddressCard