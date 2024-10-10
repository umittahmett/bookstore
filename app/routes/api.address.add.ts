import { ActionFunction, json } from "@remix-run/node";
import { verifyJWT } from "@utils/auth.server";
import { tokenCookie } from "@utils/cookie";
import { db } from "@utils/db.server";
import { JwtPayload } from "jsonwebtoken";
import { addressFormSchema } from "~/schemas/address-form";

export const action: ActionFunction = async ({ request }) => {
  // Check token
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) { return json({ error: 'Authorization token required' }, { status: 401 }) }
  const user = verifyJWT(token) as JwtPayload;
  if (!user) { return json({ error: 'Invalid or expired token' }, { status: 403 }) }

  const formPayload = Object.fromEntries(await request.formData())
  try {
    const data = addressFormSchema.parse(formPayload)
    await db.collection('addresses').insertOne(data)
    return json({ success: true, message: 'Address added' })
  } catch (error) {
    return json({ error: "Server Error", success: false }, { status: 500 })
  }
}