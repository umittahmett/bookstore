import { ActionFunction, json, redirect } from '@remix-run/node';
import { verifyJWT } from '@utils/auth.server';
import { tokenCookie } from '@utils/cookie';
import { connectToDatabase } from '@utils/db.server';
import { JwtPayload } from 'jsonwebtoken';

export const action: ActionFunction = async ({ request }) => {
  // Check token
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) { return redirect('/auth/login') }
  const user = verifyJWT(token) as JwtPayload;
  if (!user) { return redirect('/auth/login') }

  try {
    // Get form data
    const { db } = await connectToDatabase()
    const formData = await request.formData();
    const products = formData.get('products') as string;
    const addressId = formData.get('addressId') as string;
    const total = formData.get('total') as string;

    // Check if product ID is provided
    if (!products) { return json({ error: 'product ids are required' }, { status: 400 }) }
    if (!addressId) { return json({ error: 'Address ID is required' }, { status: 400 }) }
    if (!total) { return json({ error: 'Total is required' }, { status: 400 }) }

    // New Order 
    const order = await db.collection('orders').insertOne(
      {
        products: JSON.parse(products),
        userId: user.id,
        status: 'pending',
        paymentMethod: 'cash_on_delivery',
        addressId: addressId,
        date: new Date(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        shippingCost: 5,
        total: Number(total),
        tax: 3,
        discount: 0,
      }
    );

    if (!order.insertedId) { return json({ error: 'Order not placed' }, { status: 400 }) }
    return redirect('/order-summary/' + order.insertedId);

  } catch (error) {
    return json({ error: 'Internal server error' }, { status: 500 })
  }
};