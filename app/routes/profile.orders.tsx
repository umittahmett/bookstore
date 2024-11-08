import { Search, ChevronDown } from "lucide-react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs"
import { useState } from "react"
import { json, LoaderFunction, redirect } from "@remix-run/node"
import { tokenCookie } from "@utils/cookie"
import { verifyJWT } from "@utils/auth.server"
import { JwtPayload } from "jsonwebtoken"
import { connectToDatabase } from "@utils/db.server"
import { useLoaderData } from "@remix-run/react"
import OrderCard from "~/components/cards/order-card"
import { OrderProps } from "~/types"

export default function Orders() {
  const [keyword, setKeyword] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const loaderData = useLoaderData<typeof loader>()
  const { orders } = loaderData

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Siparişlerim</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="search"
            placeholder="Ürün ismi veya Marka ara"
            className="pl-10 w-full pr-4 py-2"
          />
          <Search className="absolute left-3 top-3 size-5 text-zinc-400" />
        </div>
        <Button variant="outline" className="ml-4">
          Tüm Siparişler
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs onValueChange={setSelectedTab} defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="pending">Pendwing</TabsTrigger>
          <TabsTrigger value="cnaceled">Canceled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="space-y-4">
            {orders.map((order: OrderProps, index: number) => (
              <div key={index}>
                {order.products.map((product: any, productIndex) => (
                  <OrderCard key={productIndex} {...product} />
                ))}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


// Loader function to orders
export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Check token
    const token = await tokenCookie.parse(request.headers.get("Cookie"));
    if (!token) { return redirect("/auth/login") }
    const user = verifyJWT(token) as JwtPayload;
    if (!user) { return redirect("/auth/login") }

    // Get user orders
    const { db } = await connectToDatabase()
    const ordersData = await db.collection('orders').find({ userId: user.id }).toArray()

    const orders = await Promise.all(ordersData.map(async (order: any) => {
      const products = await db.collection('products').find({ _id: { $in: order.products } }).toArray()
      return { ...order, products }
    }
    ))

    console.log(orders);


    return json({ orders })
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};