import { ActionFunction, json } from '@remix-run/node';
import { verifyJWT } from '@utils/auth.server';
import { tokenCookie } from '@utils/cookie';
import { connectToDatabase} from '@utils/db.server';
import { JwtPayload } from 'jsonwebtoken';
import { ObjectId, UpdateFilter } from 'mongodb';

interface CartProduct {
  productId: string;
  quantity: number;
  selected: boolean;
}

interface Cart {
  _id: ObjectId;
  products: CartProduct[];
}

export const action: ActionFunction = async ({ request }) => {
  // Check token
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) { return json({ error: 'Authorization token required' }, { status: 401 }) }
  const user = verifyJWT(token) as JwtPayload;
  if (!user) { return json({ error: 'Invalid or expired token' }, { status: 403 }) }

  // Get form data
  const { db } = await connectToDatabase()
  const formData = await request.formData();
  const productId = formData.get('productId') as string;
  
  // Check if product ID is provided
  if (!productId) { return json({ error: 'Product ID is required' }, { status: 400 }) }

  // Get user cart
  const userCart = await db.collection<Cart>('carts').findOne({ _id: new ObjectId(user.cartId as string) });

  // Check if cart exists
  if (!userCart) { return json({ error: 'Cart not found' }, { status: 404 }) }

  // Check if the product exists in the cart
  const productExists = userCart.products.some(product => product.productId === productId);
  if (!productExists) { return json({ error: 'Product not found in cart' }, { status: 404 }) }

  try {
    // Remove product from cart
    const updateOperation: UpdateFilter<Cart> = {
      $pull: {
        products: { productId: productId }
      }
    };
    
    const result = await db.collection<Cart>('carts').updateOne(
      { _id: new ObjectId(user.cartId as string) },
      updateOperation
    );

    // Check if product was removed
    if (result.modifiedCount === 0) {
      return json({ error: 'Failed to remove product from cart' }, { status: 500 });
    }

    return json({ success: true, message: 'Product removed from cart' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return json({ error: 'Failed to remove product from cart' }, { status: 500 });
  }
};