import { ActionFunction, json } from "@remix-run/node";
import { verifyJWT } from "@utils/auth.server";
import { tokenCookie } from "@utils/cookie";
import { connectToDatabase } from "@utils/db.server";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const action: ActionFunction = async ({request }) => {
  // Check token
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) { return json({ error: 'Authorization token required' }, { status: 401 }) }
  const user = verifyJWT(token) as JwtPayload;
  if (!user) { return json({ error: 'Invalid or expired token' }, { status: 403 }) }

  // Get form data
  const formPayload = Object.fromEntries(await request.formData())
  const addressId = formPayload.addressId as string
  
  try {
    const { db } = await connectToDatabase()
    await db.collection('addresses').deleteOne({ _id: new ObjectId(addressId) })
    return json({ success: true, message: 'Address deleted'})
  } catch (error) {
    return json({ error: "Server Error", success: false }, { status: 500 })
  }
}