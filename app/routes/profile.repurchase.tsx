import { Search } from "lucide-react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Card, CardContent } from "@components/ui/card"

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
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-zinc-200 rounded-md"></div>
                <div className="flex-grow">
                  <h3 className="font-semibold">Ürün Adı {item}</h3>
                  <p className="text-sm text-zinc-500">Son sipariş tarihi: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">149,99 TL</div>
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