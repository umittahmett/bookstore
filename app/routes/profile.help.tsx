import { Search } from "lucide-react"
import { Input } from "@components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"

export default function Help() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Yardım</h1>
      <div className="relative mb-6">
        <Input
          type="search"
          placeholder="Nasıl yardımcı olabiliriz?"
          className="pl-10 pr-4 py-2"
        />
        <Search className="absolute left-3 top-3 size-5 text-gray-400" />
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Siparişimi nasıl iptal edebilirim?</AccordionTrigger>
          <AccordionContent>
            Siparişinizi iptal etmek için, "Siparişlerim" sayfasına gidin ve iptal etmek istediğiniz siparişi bulun.
            "Sipariş Detayı" butonuna tıklayın ve "İptal Et" seçeneğini kullanın. Lütfen dikkat edin, bazı siparişler
            belirli bir aşamadan sonra iptal edilemeyebilir.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>İade işlemi nasıl yapılır?</AccordionTrigger>
          <AccordionContent>
            İade işlemi için, "Siparişlerim" sayfasında ilgili ürünü bulun ve "İade Talebi" butonuna tıklayın.
            İade nedeninizi seçin ve talimatları takip edin. Ürünü orijinal ambalajında ve tüm aksesuarlarıyla
            birlikte göndermeniz gerekmektedir. İade onaylandıktan sonra, ödeme iadeniz 5-10 iş günü içinde yapılacaktır.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Kargo takibini nasıl yapabilirim?</AccordionTrigger>
          <AccordionContent>
            Siparişinizin kargo takibini yapmak için, "Siparişlerim" sayfasına gidin ve ilgili siparişi bulun.
            "Sipariş Detayı" butonuna tıkladıktan sonra, "Kargo Takip" linkini göreceksiniz. Bu linke tıklayarak
            kargo firmasının sitesine yönlendirilecek ve güncel kargo durumunu görebileceksiniz.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}