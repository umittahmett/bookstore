import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import StoreLocation from "~/components/store-location"
import Heading from "~/components/ui/heading"
import { Input } from "~/components/ui/input"
import { Select } from "~/components/ui/select"
import { locations } from "~/data/dummy"
import { StoreLocationProps } from "~/types"

const StoreLocationsPage = () => {
  const [keyword, setKeyword] = useState("")
  const [filteredStores, setFilteredStores] = useState<StoreLocationProps[]>([])

  useEffect(() => {
    setFilteredStores(keyword ? locations.filter((location) => location.name.toLowerCase().includes(keyword.toLowerCase())) : locations)
  }, [keyword])

  return (
    <div className="default-container py-20">
      <Heading title="Explore Our Stores" description="Find the nearest store to you" type="h1" />

      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute size-5 top-3.5 left-4" />
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Explore" className="w-full pl-12" />
        {keyword && <X className="absolute size-5 top-3.5 right-3" onClick={() => setKeyword("")} />}
      </div>


      {/* Store List */}
      <div>
        {filteredStores.length > 0 ? filteredStores.map((store, index) => (
          <div key={index} className="mt-2.5">
            <StoreLocation {...store} />
          </div>
        )) : <p className="text-zinc-500 text-center mt-4">No stores found</p>}
      </div>
    </div>
  )
}

export default StoreLocationsPage