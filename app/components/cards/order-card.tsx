import { OrderProps } from '~/types';
import { getStatus } from '~/lib/helpers';
import { Button } from '@components/ui/button';

const OrderCard: React.FC<OrderProps> = (order) => {
  return (
    <div className='flex flex-col items-start gap-6 w-full border border-gray-200 rounded-xl p-2.5'>
      {/* Order Header Grid */}
      <div className="grid grid-cols-4 w-full gap-4 pb-4">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Sipariş Tarihi</div>
          <div className="text-sm font-medium">13 Kasım 2024 - 15:03</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Sipariş Özeti</div>
          <div className="text-sm font-medium">1 Teslimat, 1 Ürün</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Alıcı</div>
          <div className="text-sm font-medium">Ümit Ahmet</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Tutar</div>
            <div className="text-sm font-medium">379 TL</div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Sipariş Detayı
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Sipariş No:</span>
          <span>#{order._id.toString()}</span>
        </div>
        <span>{new Date(order.date).toDateString()}</span>
      </div>
      {
        order.products.map((product, index) => (
          <div key={index} className="flex items-start border-t pt-4 gap-4 w-full">
            <div className="size-28 flex-shrink-0 rounded-lg bg-zinc-100 flex p-2 items-center justify-center">
              <img src={product.images[0]} alt={product.title} className="h-full w-fit" />
            </div>

            <div className="flex-grow">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-zinc-600 line-clamp-2">{product.description}</p>

              <div className='mt-2'>
                {getStatus('pending')}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default OrderCard;