import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import SavedAddressCard from '@components/cards/saved-address-card'
import { AddressesPopupProps } from '~/types'
import { Button } from '../ui/button'
import { useState } from 'react'
import AddressDetailForm from '../forms/address-detail-form'
import { Plus } from 'lucide-react'
import { set } from 'date-fns'

const AddressesPopup: React.FC<AddressesPopupProps> = ({ addresses, setSelectedAddress }) => {
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false)
  const title = showAddressForm ? 'Add new address' : 'Saved Addresses'
  const desctiption = showAddressForm ? 'Fill the form below to add a new address' : 'Select an address'
  const [open, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='mt-2' size="sm">Change</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desctiption}</DialogDescription>
        </DialogHeader>
        {!showAddressForm ?
          <div className='space-y-2.5 flex max-h-[75vh] flex-col justify-start overflow-y-auto pr-2.5'>
            {addresses.length > 0 ?
              addresses?.map((item, index) => (
                <SavedAddressCard onClick={() => {
                  setSelectedAddress(item)
                  setIsOpen(false)
                }} moreDetailed {...item} key={index} />
              ))
              :
              <p className='text-zinc-500 py-10 text-sm text-center'>No addresses found</p>
            }
            <Button className='absolute bottom-5 right-5 pl-3.5' onClick={() => setShowAddressForm(!showAddressForm)} ><Plus className='size-5' />Add new</Button>
          </div>
          :
          <AddressDetailForm successFunction={() => setShowAddressForm(false)} redirectTo='/checkout' action='add' />
        }
      </DialogContent>
    </Dialog>
  )
}

export default AddressesPopup