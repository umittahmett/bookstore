import { ActionFunction, json } from "@remix-run/node";
import { db } from "@utils/db.server";
import {  resetPasswordSchema } from "@lib/schemas";
import bcrypt from "bcryptjs";


export const action: ActionFunction = async ({ request }) => {
  try {
    const formPayload = Object.fromEntries(await request.formData())
    const data = resetPasswordSchema.parse(formPayload)
    
    // Get user by email
    const user = await db.collection('customers').findOne({email: data.email})
    if (!user) { return json({ error: 'Address not found' }, { status: 404 }) }

    // Check Password
    const isValid = await bcrypt.compare(data.currentPassword, user.password);
    if (!isValid) { return json({ error: 'Password is not match' }, { status: 401 }) }

    // Update password
    const newHashedPassword = await bcrypt.hash(data.newPassword, 10);
    const updateResult = await db.collection('customers').updateOne(
      { email: data.email },
      { $set: { password: newHashedPassword } }
    );

    // Check action result
    if (updateResult.modifiedCount === 0) {
      return json({ error: 'Failed to update password' }, { status: 500 });
    }

    return json({ success: true, message: 'Passoword updated' })

  } catch (error) {
    return json({ error: "Server Error", success: false }, { status: 500 })
  }
}