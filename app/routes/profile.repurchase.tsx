import { Search } from "lucide-react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Card, CardContent } from "@components/ui/card"
import { deliveredOrders } from "~/data/dummy"

export default function Repurchase() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tekrar Satın Al</h1>
      <div className="relative mb-6">
        <Input
          type="search"
          placeholder="Önceki siparişlerinizde arayın"
          className="pl-10 pr-4 py-2"
        />
        <Search className="absolute left-3 top-3 size-5 text-zinc-400" />
      </div>
      <div className="grid gap-4">
        {deliveredOrders.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className='size-20 flex-shrink-0 rounded-lg bg-zinc-100 flex p-2 items-center justify-center'>
                  <img src={item.product.cover_image_url} alt={item.product.title} className="h-full w-fit object-contain" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">Ürün Adı {item.product.title}</h3>
                  <p className="text-sm text-zinc-500">Son sipariş tarihi: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{item.product.price * item.count} TL</div>
                  <Button size="sm" className="mt-2">Sepete Ekle</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}