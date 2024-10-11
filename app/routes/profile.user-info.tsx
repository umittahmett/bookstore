import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { verifyJWT } from "@utils/auth.server";
import { tokenCookie } from "@utils/cookie";
import { db } from "@utils/db.server";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb"
import MembershipForm from "@components/forms/membership-form";
import ResetPasswordForm from "@components/forms/reset-pasword-form";

export default function UserInformation() {
  const loaderData = useLoaderData<typeof loader>()
  const { user } = loaderData
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <MembershipForm {...user} />
      <ResetPasswordForm {...user} />
    </div>
  )
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Check token
    const token = await tokenCookie.parse(request.headers.get("Cookie"));
    if (!token) { return json({ userToken: null }) }
    const userToken = verifyJWT(token) as JwtPayload
    if (!userToken) { return json({ userToken: null }) }

    // get user cart products length
    const user = await db.collection('customers').findOne({ _id: new ObjectId(userToken.id as string) })

    // check user
    if (!user) { return json({ error: 'Invalid or expired token' }, { status: 403 }) }

    return json({ user });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};