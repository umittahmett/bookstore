import { Check, CircleCheck, CircleX, Clock, X } from "lucide-react";

export const getStatus = (status: string) => {
  const statuses: any = {
    delivered: { icon: <CircleCheck className="size-5 text-green-500 mr-2" />, text: 'Delivered', color: 'text-green-500' },
    pending: { icon: <Clock className="size-5 text-amber-500 mr-2" />, text: 'Pending', color: 'text-amber-500' },
    canceled: { icon: <CircleX className="size-5 text-red-500 mr-2" />, text: 'Canceled', color: 'text-red-500' },
  };
  const currentStatus = statuses[status];
  return currentStatus ? (
    <div className="flex items-center">
      {currentStatus.icon}
      <span className={`${currentStatus.color} font-medium`}>{currentStatus.text}</span>
    </div>
  ) : null;
};