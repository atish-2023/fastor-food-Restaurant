import React from 'react';
import { OrderItem } from '../../api/foodApi';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../common/Button';
import { SafeImage } from '../common/SafeImage';

interface OrderCardProps {
  order: OrderItem;
  onCancel: (order: OrderItem) => void;
  onTrack: (order: OrderItem) => void;
  onClickDetail?: (order: OrderItem) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onCancel,
  onTrack,
  onClickDetail,
}) => {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      {/* Portrait food photo */}
      <div
        onClick={() => onClickDetail?.(order)}
        className="w-[66px] h-[90px] rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-2xs group"
      >
        <SafeImage
          src={order.image}
          fallback={order.fallback}
          alt={order.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Details & Actions */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          {/* Title + date */}
          <div className="min-w-0">
            <h4
              onClick={() => onClickDetail?.(order)}
              className="text-base font-bold text-[#1E1B18] tracking-tight truncate cursor-pointer hover:text-[#E95322]"
            >
              {order.name}
            </h4>
            <p className="text-xs text-[#828282] mt-0.5">{order.date}</p>
          </div>

          {/* Price + item count, right aligned */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-base font-extrabold text-[#E95322]">
              {formatPrice(order.price, order.currency)}
            </span>
            <span className="text-xs text-[#828282] mt-0.5">
              {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Buttons Row - always one line */}
        <div className="flex items-center gap-2 mt-2">
          {order.status === 'cancelled' ? (
            <span className="text-xs text-red-500 font-semibold bg-red-50 px-2.5 py-1 rounded-full">
              Cancelled
            </span>
          ) : (
            <>
              <Button
                variant="pill"
                fullWidth={false}
                onClick={() => onCancel(order)}
              >
                Cancel Order
              </Button>

              <Button
                variant="pill-light"
                fullWidth={false}
                onClick={() => onTrack(order)}
              >
                Track Driver
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
