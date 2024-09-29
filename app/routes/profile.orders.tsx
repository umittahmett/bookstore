import { Search, ChevronDown } from "lucide-react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs"
import { Card, CardContent } from "@components/ui/card"

export default function Orders() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Siparişlerim</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Input
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
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="font-semibold">Sipariş Tarihi</div>
                  <div>10 Eylül 2024 - 21:21</div>
                </div>
                <div>
                  <div className="font-semibold">Sipariş Özeti</div>
                  <div>6 Teslimat, 6 Ürün</div>
                </div>
                <div>
                  <div className="font-semibold">Alıcı</div>
                  <div>Ümit Ahmet</div>
                </div>
                <div>
                  <div className="font-semibold">Tutar</div>
                  <div className="text-amber-500">31.211,25 TL</div>
                </div>
                <Button>Sipariş Detayı</Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start border-t pt-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-zinc-200 rounded-md mr-4"></div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-500 font-medium">Teslim Edildi</span>
                      </div>
                      <p className="text-sm text-zinc-600">1 ürün {12 + item} Eylül tarihinde teslim edilmiştir.</p>
                    </div>
                    {item === 4 && (
                      <Button variant="outline" className="ml-auto">
                        İade Talebi
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}