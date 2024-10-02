import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Button } from '@components/ui/button'
import { CartProductProps, CartProps } from '~/types'
import { ObjectId } from 'mongodb'

const Cart: React.FC<CartProps> = ({ products }) => {
  const [cartItems, setCartItems] = useState<CartProductProps[]>(products)

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) =>
      item.selected ? sum + item.price * item.quantity : sum, 0
    )
  }

  const subtotal = calculateSubtotal()
  const tax = 0
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  const updateQuantity = (id: ObjectId, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, quantity } : item
    ))
  }

  const removeItem = (id: ObjectId) => {
    setCartItems(cartItems.filter(item => item._id !== id))
  }

  const toggleItemSelection = (id: ObjectId) => {
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, selected: !item.selected } : item
    ))
  }

  const toggleAllItems = (selected: boolean) => {
    setCartItems(cartItems.map(item => ({ ...item, selected })))
  }

  const removeSelectedItems = () => {
    setCartItems(cartItems.filter(item => !item.selected))
  }

  const allSelected = cartItems.every(item => item.selected)
  const someSelected = cartItems.some(item => item.selected)

  return (
    <div className="default-container flex items-start gap-10 py-10">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <span className="text-zinc-600">{cartItems.length} Items in cart</span>
        </div>

        <div className="space-y-4">
          <div className='flex items-center justify-between'>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={allSelected}
                onCheckedChange={(checked) => toggleAllItems(checked as boolean)}
              />
              <label htmlFor="select-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select All
              </label>
            </div>

            {someSelected && (
              <button className='text-sm text-red-500 hover:text-red-600 duration-200 font-medium' onClick={removeSelectedItems}>
                Remove selected
              </button>
            )}
          </div>
          {cartItems.map((item) => (
            <div key={item._id.toString()} className="flex items-center space-x-4 py-4 border-b">
              <Checkbox
                id={`item-${item._id}`}
                checked={item.selected}
                onCheckedChange={() => toggleItemSelection(item._id)}
              />
              <div className='size-28 rounded-lg bg-zinc-100 flex p-2 items-center justify-center'>
                <img src={item.images[0]} alt={item.title} className="h-full w-fit object-contain" />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-zinc-600 line-clamp-2">{item.description}</p>
              </div>
              <Select
                value={item.quantity.toString()}
                onValueChange={(value) => updateQuantity(item._id, parseInt(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="font-semibold">${item.price.toFixed(2)}</span>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item._id)}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-zinc-50 p-6 rounded-xl sticky top-10'>
        <div className="*:py-4 divide-zinc-200 divide-y ">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-8">
          <Button className='w-full mb-2.5' disabled={total === 0}>
            Confirm payment
          </Button>
          <a href="/">
            <Button variant="outline" className="w-full">Continue Shopping</Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Cart