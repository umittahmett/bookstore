import { useState } from 'react'
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Textarea } from "@components/ui/textarea"
import { addresses, books } from '@data/dummy'
import SavedAddressCard from '@components/cards/saved-address-card'
import AddressesPopup from '@components/popups/addresses-popup'
import { AddressProps } from '~/types'
import clsx from 'clsx'

export default function CheckoutPage() {
  const [couponCode, setCouponCode] = useState('')
  const handleApplyCoupon = () => {
    console.log('Applying coupon:', couponCode)
  }
  const calculateTotal = () => {
    return books.reduce((total, book) => total + book.price * book.stockQuantity, 0).toFixed(2)
  }
  const calculateSubtotal = () => {
    return books.reduce((total, book) => total + book.price * book.stockQuantity, 0).toFixed(2)
  }
  const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(null)

  return (
    <div className="default-container py-10">
      <h1 className="text-2xl font-bold mb-2">Checkout</h1>
      <p className="text-zinc-600 mb-8">There are 3 products in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div>
          {/* Saved Address Selection */}
          <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
          <div className='grid sm:grid-cols-3 items-start gap-2.5'>
            {addresses.slice(0, 3).map((item, index) => (
              <SavedAddressCard onClick={() => setSelectedAddress(item)} className={clsx('h-full', item === selectedAddress && 'bg-amber-400 hover:bg-amber-400')} {...item} key={index} />
            ))}
          </div>

          {/* All Addresses Popup */}
          <AddressesPopup />

          {/* New Address Form */}
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm text-zinc-600">First name*</Label>
                <Input id="firstName" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm text-zinc-600">Last name*</Label>
                <Input id="lastName" required className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="text-sm text-zinc-600">Address*</Label>
              <Input id="address" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="addressLine2" className="text-sm text-zinc-600">Address line 2</Label>
              <Input id="addressLine2" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country" className="text-sm text-zinc-600">Country*</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cityTown" className="text-sm text-zinc-600">City/Town*</Label>
                <Input id="cityTown" required className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postcode" className="text-sm text-zinc-600">Postcode / ZIP*</Label>
                <Input id="postcode" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm text-zinc-600">Phone*</Label>
                <Input id="phone" type="tel" required className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="additionalInfo" className="text-sm text-zinc-600">Additional information</Label>
              <Textarea id="additionalInfo" className="mt-1" rows={4} />
            </div>
          </form>

          {/* Coupon Code */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Apply Coupon to get discount!</h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleApplyCoupon} >Apply Code</Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <Card className="bg-zinc-50">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-semibold text-zinc-600">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {/* Books */}
              {books.map((book) => (
                <div key={book._id.toString()} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center space-x-2">
                    <div className='size-20 rounded-lg bg-zinc-100 flex p-2 items-center justify-center'>
                      <img src={book.images[0]} alt={book.title} className="h-full w-fit object-contain" />
                    </div>
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-zinc-600">{book.author}</p>
                      <p className="text-sm text-zinc-600">Qty: {book.stockQuantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">${(book.price * book.stockQuantity).toFixed(2)}</span>
                </div>
              ))}

              {/* Subtotal, Shipping Cost, Discount */}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping Cost (+)</span>
                  <span className="font-medium">$10.85</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount (-)</span>
                  <span className="font-medium">$9.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                  <span>Total Payable</span>
                  <span>${(parseFloat(calculateTotal()) + 10.85 - 9).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">Place an Order</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}