import { ActionFunction, json } from "@remix-run/node";
import { verifyJWT } from "@utils/auth.server";
import { tokenCookie } from "@utils/cookie";
import { connectToDatabase } from "@utils/db.server";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { membershipSchema } from "@lib/schemas";

export const action: ActionFunction = async ({ request }) => {
  // Check token
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) { return json({ error: 'Authorization token required' }, { status: 401 }) }
  const userToken = verifyJWT(token) as JwtPayload;
  if (!userToken) { return json({ error: 'Invalid or expired token' }, { status: 403 }) }

  const formPayload = Object.fromEntries(await request.formData())
  try {
    const { db } = await connectToDatabase()
    const data = membershipSchema.parse(formPayload)
    // Check if user exists
    const user = await db.collection('customers').findOne({ _id: new ObjectId(userToken.id as string) })
    if (!user) { return json({ error: 'User not found' }, { status: 404 }) }
    // Update user
    await db.collection('customers').updateOne({ _id: new ObjectId(userToken.id as string) }, { $set: data })
    return json({ success: true, message: 'User updated' })

  } catch (error) {
    return json({ error: "Server Error", success: false }, { status: 500 })
  }
}