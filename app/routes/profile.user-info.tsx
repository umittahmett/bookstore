import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card"

export default function UserInfo() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Bilgilerim</h1>
      <Card>
        <CardHeader>
          <CardTitle>Kişisel Bilgiler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ad</Label>
              <Input id="firstName" defaultValue="Ümit" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Soyad</Label>
              <Input id="lastName" defaultValue="Ahmet" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input id="email" type="email" defaultValue="umit.Ahmet@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" type="tel" defaultValue="+90 555 123 4567" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Değişiklikleri Kaydet</Button>
        </CardFooter>
      </Card>
    </div>
  )
}