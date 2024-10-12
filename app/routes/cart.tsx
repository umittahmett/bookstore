import { Suspense, useState } from 'react'
import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import { Button } from '@components/ui/button'
import { CartProductProps } from '~/types'
import { ObjectId } from 'mongodb'
import { json, LoaderFunction, redirect } from '@remix-run/node'
import { tokenCookie } from '@utils/cookie'
import { verifyJWT } from '@utils/auth.server'
import { db } from '@utils/db.server'
import { JwtPayload } from 'jsonwebtoken'
import { useLoaderData } from '@remix-run/react'
import Counter from '@components/ui/counter'
import { useFetchAction } from '@hooks/use-global-submit'

const Cart: React.FC = () => {
  const userCart = useLoaderData<typeof loader>();
  const [cartItems, setCartItems] = useState<CartProductProps[]>(userCart.products);
  const { sendAction } = useFetchAction();

  // Toggle select status of a product
  const handleToggleSelect = (productId: string) => {
    const formData = new FormData();
    formData.append('productId', productId);

    sendAction(
      {
        formData: formData,
        method: 'put',
        action: '/api/cart/toggle-select',
        successFunction: () => {
          const updatedItems = cartItems.map(item => {
            if (item._id.toString() === productId) {
              return { ...item, selected: !item.selected };
            }
            return item;
          }
          );
          setCartItems(updatedItems);
        }
      }
    );
  };

  // Update quantity of a product
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('quantity', quantity.toString());
    sendAction({
      formData: formData,
      method: 'put',
      action: '/api/cart/update-quantity',
      successFunction: () => {
        const updatedItems = cartItems.map(item => {
          if (item._id.toString() === productId) {
            return { ...item, quantity };
          }
          console.log(item);
          return item;
        });
        setCartItems(updatedItems);
      }
    });
  };

  // Delete a product
  const handleDeleteProduct = (productId: string) => {
    const formData = new FormData();
    formData.append('productId', productId);
    sendAction({
      formData: formData,
      method: 'delete',
      action: '/api/cart/delete-product',
      successFunction: () => {
        const updatedItems = cartItems.filter(item => item._id.toString() !== productId);
        setCartItems(updatedItems);
      }
    });
  }

  // Calculate subtotal, tax, shipping and total
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) =>
      item.selected ? sum + item.price * item.quantity : sum, 0
    )
  }
  const subtotal = calculateSubtotal()
  const tax = 0
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  return (
    cartItems.length > 0 ?
      <Suspense fallback={<div>Loading...</div>}>
        <div className="default-container flex items-start gap-10 py-10">
          <div>
            {/* Cart Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Your Cart</h1>
              <span className="text-zinc-600">{cartItems.length} Items in cart</span>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id.toString()} className="flex relative items-center space-x-4 py-4 border-b">
                  <Checkbox
                    id={`product-${item._id}`}
                    defaultChecked={item.selected}
                    onCheckedChange={() => handleToggleSelect(item._id.toString())}
                  />

                  <div className='size-28 flex-shrink-0 rounded-lg bg-zinc-100 flex p-2 items-center justify-center'>
                    <img src={item.images[0]} alt={item.title} className="h-full w-fit object-contain" />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-zinc-600 line-clamp-2">{item.description}</p>
                  </div>
                  <Button variant="ghost" className='size-auto hover:text-zinc-700 text-xs hover:bg-white absolute top-0 right-0 text-zinc-500' size="icon"
                    onClick={() => handleDeleteProduct(item._id.toString())}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                  <div className='flex items-center gap-10'>
                    <Counter
                      reduce={() => item.quantity > 1 && handleUpdateQuantity(item._id.toString(), Number(item.quantity) - 1)}
                      increase={() => handleUpdateQuantity(item._id.toString(), Number(item.quantity) + 1)}
                      count={item.quantity}
                      onChange={(e: any) => handleUpdateQuantity(item._id.toString(), Number(e.target.value))}
                    />
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
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
              <a aria-disabled={total === 0} href="/checkout">
                <Button className='w-full mb-2.5'>
                  Confirm payment
                </Button>
              </a>
              <a href="/">
                <Button variant="outline" className="w-full">Continue Shopping</Button>
              </a>
            </div>
          </div>
        </div>
      </Suspense>
      :
      // Empty Cart Message
      <div className='flex justify-center items-center flex-col h-[40vh]'>
        <p className='text-xl text-center'>Your cart is empty</p>
        <a href="/"><Button className='mt-4'><ShoppingBag className='size-5' /> Continue Shopping <ArrowRight className='size-5' /></Button></a>
      </div>
  )
}

export default Cart

// Loader function to get user cart and products
export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Check token
    const token = await tokenCookie.parse(request.headers.get("Cookie"));
    if (!token) { return redirect("/auth/login") }
    const user = verifyJWT(token) as JwtPayload;
    if (!user) { return redirect("/auth/login") }

    // Get user cart
    const userCart = await db.collection('carts').findOne({ _id: new ObjectId(user.cartId as string) });

    // Check if cart exists
    if (!userCart) {
      return json({ error: 'Cart not found' }, { status: 404 });
    }

    // Get Products in cart
    const productsInCart = await db.collection('products').find({
      _id: { $in: userCart.products.map((product: any) => new ObjectId(product.productId as string)) }
    }).toArray()

    // Map products and merge with 'selected' and 'quantity' from userCart
    const enrichedProducts = productsInCart.map(product => {
      const cartProduct = userCart.products.find((p: any) => p.productId === product._id.toString());
      return {
        ...product,
        quantity: cartProduct?.quantity || 1,
        selected: cartProduct?.selected || false
      };
    });

    return json({ cart: userCart, products: enrichedProducts });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};