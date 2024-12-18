import { ActionFunction, json, redirect } from '@remix-run/node';
import { verifyJWT } from '@utils/auth.server';
import { tokenCookie } from '@utils/cookie';
import { connectToDatabase} from '@utils/db.server';
import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const action: ActionFunction = async ({ request }) => {
  // Check token
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) { return redirect('/auth/login') }
  const user = verifyJWT(token) as JwtPayload;
  if (!user) { return redirect('/auth/login') }

  // Get form data
  const { db } = await connectToDatabase()
  const formData = await request.formData();
  const productId = formData.get('productId') as string;
  
  // Check if product ID is provided
  if (!productId) { return json({ error: 'Product ID is required' }, { status: 400 }) }

  // Get user cart
  const userCart = await db.collection('carts').findOne({ _id: new ObjectId(user.cartId as string) });

  // Check if cart exists
  if (!userCart) { return json({ error: 'Cart not found' }, { status: 404 }) }

  // Check if product already in cart
  const existingProduct = userCart.products.find((product: any) => product.productId === productId);

  if (existingProduct) {
    // If product already in cart, increase quantity
    await db.collection('carts').updateOne(
      { _id: new ObjectId(user.cartId as string), "products.productId": productId },
      { $inc: { "products.$.quantity": 1 } }
    );
    return json({ success: true, message: 'Product quantity updated' });
  } else {
    // If product not in cart, add product
    await db.collection('carts').updateOne(
      { _id: new ObjectId(user.cartId as string) },
      {
        $push: {
          "products": {
            productId: productId,
            quantity: 1,
            selected: true
          } as any
        }
      }
    );
    return json({ success: true, message: 'Product added to cart' });
  }
};