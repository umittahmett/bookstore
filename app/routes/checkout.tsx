import { useEffect, useState } from 'react'
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import SavedAddressCard from '@components/cards/saved-address-card'
import AddressesPopup from '@components/popups/addresses-popup'
import { AddressProps, CartProductProps, CartProps } from '~/types'
import { json, LoaderFunction, redirect } from '@remix-run/node'
import { tokenCookie } from '@utils/cookie'
import { verifyJWT } from '@utils/auth.server'
import { JwtPayload } from 'jsonwebtoken'
import { connectToDatabase } from '@utils/db.server'
import { ObjectId } from 'mongodb'
import { useLoaderData } from '@remix-run/react'
import { Checkbox } from '~/components/ui/checkbox'
import { useFetchAction } from '~/hooks/use-global-submit'

export default function CheckoutPage() {
  const loaderData = useLoaderData<typeof loader>();
  const { products, addresses } = loaderData;
  const [couponCode, setCouponCode] = useState('')
  const { sendAction } = useFetchAction();

  const calculateTotal = () => {
    return products.reduce((total: number, book: CartProductProps) => total + book.price * book.quantity, 0).toFixed(2)
  }
  const calculateSubtotal = () => {
    return products.reduce((total: number, book: CartProductProps) => total + book.price * book.quantity, 0).toFixed(2)
  }
  const [selectedAddress, setSelectedAddress] = useState<AddressProps>(addresses[0])
  const [cashOnDelivery, setCashOnDelivery] = useState(true)

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('products', JSON.stringify(products.map((product: any) => ({ _id: product._id.toString(), quantity: product.quantity }))));
    formData.append('addressId', selectedAddress._id.toString());
    formData.append('total', calculateTotal());

    sendAction(
      {
        formData: formData,
        method: 'put',
        action: '/api/orders/new-order',
      }
    );

  }


  useEffect(() => {
    console.log(products);

  }, [])
  return (
    <div className="default-container py-10">
      <h1 className="text-2xl font-bold mb-2">Checkout</h1>
      <p className="text-zinc-600 mb-8">There are 3 products in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div>
          {/* Saved Address Selection */}
          <h2 className="text-xl font-semibold mb-2">{selectedAddress ? 'Saved Addresses' : 'Address Data Not Found'}</h2>
          <div className='w-full'>
            {selectedAddress && <SavedAddressCard moreDetailed {...selectedAddress} />}
            {/* All Addresses Popup */}
            <AddressesPopup setSelectedAddress={setSelectedAddress} addresses={addresses} />

            <div className='flex items-center opacity-50 w-full mb-4 mt-6'>
              <Checkbox
                className="max-lg:size-6 mr-2"
                id={`cashOnDelivery`}
                checked={true}
              // defaultChecked={cashOnDelivery}
              // onChange={() => setCashOnDelivery(!cashOnDelivery)}
              />
              <Label htmlFor="additionalInfo" className="text-sm text-zinc-600">Cash on delivery</Label>
            </div>
          </div>

          {/* Coupon Code */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Apply Coupon to get discount!</h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-grow"
              />
              <Button>Apply Code</Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <Card className="bg-zinc-50">
          <CardContent className="p-6">
            <form onSubmit={onSubmit}>
              <h2 className="text-xl font-semibold mb-4">Your Order</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-semibold text-zinc-600">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                {/* Books */}
                {products.map((book: CartProductProps) => (
                  <div key={book._id.toString()} className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center space-x-2">
                      <div className='size-20 rounded-lg bg-zinc-100 flex p-2 items-center justify-center'>
                        <img src={book.images[0]} alt={book.title} className="h-full w-fit object-contain" />
                      </div>
                      <div>
                        <p className="font-medium">{book.title}</p>
                        <p className="text-sm text-zinc-600">{book.author}</p>
                        <p className="text-sm text-zinc-600">Qty: {book.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(book.price * book.quantity).toFixed(2)}</span>
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
                    <span className="font-medium">$5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount (-)</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (+)</span>
                    <span className="font-medium">$3</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                    <span>Total Payable</span>
                    <span>${(parseFloat(calculateTotal()) + 8).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                {cashOnDelivery ? 'Place Order' : 'Pay Now'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Loader function to get user cart and products
export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Check token
    const token = await tokenCookie.parse(request.headers.get("Cookie"));
    if (!token) { return redirect("/auth/login") }
    const user = verifyJWT(token) as JwtPayload;
    if (!user) { return redirect("/auth/login") }

    const { db } = await connectToDatabase()

    // Get user addresses
    const addresses = await db.collection('addresses').find({ userId: user.id }).toArray()

    // Get user cart
    const userCart = await db.collection('carts').findOne({ _id: new ObjectId(user.cartId as string) });

    // Check if cart exists
    if (!userCart) {
      return json({ error: 'Cart not found' }, { status: 404 });
    }

    // Get Products in cart
    const productsToCheckout = await db.collection('products').find({
      _id: { $in: userCart.products.filter((item: CartProps) => item.selected).map((product: any) => new ObjectId(product.productId as string)) }
    }).toArray()

    if (!productsToCheckout) { return redirect("/cart") }

    const products = productsToCheckout.map(product => {
      const checkoutProduct = userCart.products.find((p: any) => p.productId === product._id.toString());
      return {
        ...product,
        quantity: checkoutProduct?.quantity || 1,
        selected: checkoutProduct?.selected || false
      };
    });

    return json({ products, addresses });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};