import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { OrderProps } from '~/types';
import { getStatus } from '~/lib/helpers';

const OrderCard: React.FC<OrderProps> = ({ seller, date, status, product }) => {

  return (
    <div className="flex items-start border-t pt-4 gap-4">
      <div className="flex items-center gap-4">
        <div className="size-28 flex-shrink-0 rounded-lg bg-zinc-100 flex p-2 items-center justify-center">
          <img src={product.images[0]} alt={product.title} className="h-full w-fit object-contain" />
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-zinc-600 line-clamp-2">{product.description}</p>
          <div className='mt-2'>
            {getStatus(status)}
          </div>
          {status === 'delivered' && <p className="text-sm text-zinc-600">1 ürün {date} tarihinde teslim edilmiştir.</p>}
        </div>
      </div>

      {status === 'delivered' && (
        <Button variant="outline" className="ml-auto">
          İade Talebi
        </Button>
      )}
    </div>
  );
};

export default OrderCard;
