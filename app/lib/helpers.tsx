import { Check, Clock, X } from "lucide-react";

export const getStatus = (status: string) => {
  const statuses: any = {
    delivered: { icon: <Check className="size-4 text-green-500 mr-2" />, text: 'Teslim Edildi', color: 'text-green-500' },
    pending: { icon: <Clock className="size-4 text-yellow-500 mr-2" />, text: 'Beklemede', color: 'text-yellow-500' },
    canceled: { icon: <X className="size-4 text-red-500 mr-2" />, text: 'İptal Edildi', color: 'text-red-500' },
  };
  const currentStatus = statuses[status];
  return currentStatus ? (
    <div className="flex items-center">
      {currentStatus.icon}
      <span className={`${currentStatus.color} text-sm`}>{currentStatus.text}</span>
    </div>
  ) : null;
};