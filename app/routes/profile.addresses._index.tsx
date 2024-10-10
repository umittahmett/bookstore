import { Plus } from "lucide-react"
import { Button } from "@components/ui/button"
import SavedAddressCard from "@components/cards/saved-address-card"
import { json, LoaderFunction, redirect } from "@remix-run/node"
import { tokenCookie } from "@utils/cookie"
import { verifyJWT } from "@utils/auth.server"
import { JwtPayload } from "jsonwebtoken"
import { db } from "@utils/db.server"
import { useLoaderData } from "@remix-run/react"
import { AddressProps } from "~/types"

export default function Addresses() {
  const loaderData = useLoaderData<typeof loader>();
  const { addresses } = loaderData;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Adres Bilgilerim</h1>
      <div className="grid gap-2.5">
        {addresses.map((item: AddressProps, index: number) => (
          <SavedAddressCard moreDetailed key={index} {...item} />
        ))}
        <a className="mt-4 w-fit ml-auto" href="/profile/addresses/new">
          <Button className="pl-4">
            <Plus className="h-4 w-4" />
            Add new
          </Button>
        </a>
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

    // Get user addresses
    const addresses = await db.collection('addresses').find({ userId: user._id }).toArray()

    return json({ addresses });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};