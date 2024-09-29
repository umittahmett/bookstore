import { CreditCard, Plus } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"

export default function SavedCards() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kayıtlı Kartlarım</h1>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Visa ile biten kart ****1234</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Son Kullanma: 12/2025</span>
              </div>
              <Button variant="outline">Düzenle</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mastercard ile biten kart ****5678</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Son Kullanma: 09/2024</span>
              </div>
              <Button variant="outline">Düzenle</Button>
            </div>
          </CardContent>
        </Card>
        <Button className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Yeni Kart Ekle
        </Button>
      </div>
    </div>
  )
}