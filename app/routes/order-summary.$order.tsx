import { Check, AlertCircle, Package, Truck, Calendar, ShoppingBag, FileText, ArrowLeft, RefreshCcw, ChevronLeft } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { Separator } from "@components/ui/separator"
import { useLoaderData } from "@remix-run/react"
import { OrderProps } from "~/types"
import { json, LoaderFunction, redirect } from "@remix-run/node"
import { tokenCookie } from "@utils/cookie"
import { verifyJWT } from "@utils/auth.server"
import { JwtPayload } from "jsonwebtoken"
import { connectToDatabase } from "@utils/db.server"
import { ObjectId } from "mongodb"

export default function OrderResult() {
  const loaderData = useLoaderData<typeof loader>()
  const order: OrderProps = loaderData.order

  const icon = order ? (
    <Check className="h-6 w-6 text-green-600" />
  ) : (
    <AlertCircle className="h-6 w-6 text-red-600" />
  )

  const title = order ? "Order Completed" : "Order Processing Error"
  const subtitle = order
    ? "Thank you for your purchase!"
    : "We encountered an issue while processing your order."
  return (
    <div className="h-dvh py-10 bg-zinc-50">
      <Card className="w-full default-container !max-w-5xl py-8">
        <CardHeader className="text-center">
          <div className={`w-12 h-12 ${order ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {icon}
          </div>
          <CardTitle className={`text-2xl font-bold ${order ? '' : 'text-red-600'}`}>{title}</CardTitle>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {order ?
            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Order number:</span>
                  </div>
                  <span>#{order._id.toString()}</span>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Order date:</span>
                  </div>
                  <span>{new Date(order.date).toDateString()}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Estimated delivery:</span>
                  </div>
                  <span>{new Date(order.estimatedDelivery).toDateString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Total amount:</span>
                  <span>${order.total}</span>
                </div>
              </div>
            </div>
            :
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error Details</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      There was a problem processing your payment. Please check your payment details and try again.
                      If the problem persists, contact our customer support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }

        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <a href={!order ? '/cart' : '/profile/orders/'}>
            <Button className="w-full sm:w-auto">
              {!order ?
                <><ArrowLeft className="size-4" />Back to cart</>
                :
                <><FileText className="size-4" /> View Order Details </>
              }
            </Button>
          </a>
          <a href="/">
            <Button className="w-full sm:w-auto" variant="outline">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div >
  )
}


// Loader function to get user cart and products
export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    // Check token
    const token = await tokenCookie.parse(request.headers.get("Cookie"));
    if (!token) { return redirect("/auth/login") }
    const user = verifyJWT(token) as JwtPayload
    if (!user) { return redirect("/auth/login") }

    const orderId = params.order

    const { db } = await connectToDatabase()

    // Get Order Details
    const order = await db.collection('orders').findOne({ _id: new ObjectId(orderId as string) }) || null

    // if (!order?._id) { return json({ error: 'Order not found' }, { status: 404 }) }

    return json({ order });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};