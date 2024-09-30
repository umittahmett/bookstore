import { Search, ChevronDown } from "lucide-react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs"
import { Card, CardContent } from "@components/ui/card"
import { useState } from "react"
import { deliveredOrders } from "~/data/dummy"
import OrderCard from "~/components/cards/order-card"

export default function Orders() {
  const [keyword, setKeyword] = useState("")
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Siparişlerim</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="search"
            placeholder="Ürün ismi veya Marka ara"
            className="pl-10 pr-4 py-2 w-80"
          />
          <Search className="absolute left-3 top-3 size-5 text-zinc-400" />
        </div>
        <Button variant="outline" className="ml-4">
          Tüm Siparişler
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="ongoing">Devam Eden Siparişler</TabsTrigger>
          <TabsTrigger value="returns">İadeler</TabsTrigger>
          <TabsTrigger value="cancellations">İptaller</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="space-y-4">
            {deliveredOrders.map((order, index) => (
              <OrderCard key={index} {...order} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}