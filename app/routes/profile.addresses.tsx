import { Plus } from "lucide-react"
import { Button } from "@components/ui/button"
import { addresses } from "~/data/dummy"
import SavedAddressCard from "@components/cards/saved-address-card"

export default function Addresses() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Adres Bilgilerim</h1>
      <div className="grid gap-2.5">
        {addresses.map((item, index) => (
          <SavedAddressCard moreDetailed key={index} {...item} />
        ))}
        <Button className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Yeni Adres Ekle
        </Button>
      </div>
    </div>
  )
}