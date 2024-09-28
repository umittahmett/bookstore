import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import { addresses } from '@data/dummy'
import SavedAddressCard from '@components/cards/saved-address-card'

const AddressesPopup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='text-sm font-light mb-6 mt-2 ml-1 duration-200 text-zinc-600 hover:text-black'>View all</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Saved Addresses</DialogTitle>
          <DialogDescription>Select an address</DialogDescription>
        </DialogHeader>
        <div className='space-y-2.5 flex max-h-[75vh] flex-col justify-start overflow-y-auto pr-2.5'>
          {addresses.map((item, index) => (
            <SavedAddressCard moreDetailed {...item} key={index} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddressesPopup