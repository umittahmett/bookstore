import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import SavedAddressCard from '@components/cards/saved-address-card'
import { AddressesPopupProps } from '~/types'
import { Button } from '../ui/button'

const AddressesPopup: React.FC<AddressesPopupProps> = ({ addresses, setSelectedAddress }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='mt-2' size="sm">Change</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Saved Addresses</DialogTitle>
          <DialogDescription>Select an address</DialogDescription>
        </DialogHeader>
        <div className='space-y-2.5 flex max-h-[75vh] flex-col justify-start overflow-y-auto pr-2.5'>
          {addresses.length > 0 ?
            addresses?.map((item, index) => (
              <SavedAddressCard onClick={() => setSelectedAddress(item)} moreDetailed {...item} key={index} />
            ))
            :
            <p className='text-zinc-500 py-10 text-sm text-center'>No addresses found</p>
          }
          <a href="/profile/addresses/new" className='ml-auto'>
            <Button size='sm'>Add new</Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddressesPopup