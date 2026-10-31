import React from 'react';
import { BestSellerItem } from '../../api/foodApi';
import { SafeImage } from '../common/SafeImage';

interface BestSellerCardProps {
  item: BestSellerItem;
  onClick?: (item: BestSellerItem) => void;
}

export const BestSellerCard: React.FC<BestSellerCardProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(item)}
      className="group relative aspect-[2/3] min-w-0 flex-1 cursor-pointer overflow-hidden rounded-[24px] shadow-xs transition-all active:scale-95"
    >
      {/* Food photo - 2:3 rounded card, 4 cards share the row width equally like the Figma */}
      <SafeImage
        src={item.image}
        fallback={item.fallback}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Price tag flush with the bottom-right corner, only top-left rounded */}
      <div className="absolute bottom-0 right-0 rounded-tl-[10px] bg-[#E95322] px-2 py-1 text-[13px] font-semibold leading-none text-white">
        {item.priceLabel}
      </div>
    </div>
  );
};
