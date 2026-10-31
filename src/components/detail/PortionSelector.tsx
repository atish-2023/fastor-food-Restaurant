import React from 'react';
import { PortionOption } from '../../api/foodApi';
import { formatPrice } from '../../utils/formatPrice';

interface PortionSelectorProps {
  portions: PortionOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const PortionSelector: React.FC<PortionSelectorProps> = ({
  portions,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="mt-[30px]">
      <h3 className="mb-[13px] text-xl font-medium text-[#391713]">
        Personal portion
      </h3>

      {/* 29px row pitch = 16px row + 13px gap */}
      <div className="space-y-[13px]">
        {portions.map((portion) => {
          const isSelected = portion.id === selectedId;

          return (
            <div
              key={portion.id}
              onClick={() => onSelect(portion.id)}
              className="flex min-w-0 items-center cursor-pointer select-none"
            >
              {/* Label - one single style */}
              <span className="w-[104px] shrink-0 text-sm leading-[14px] font-light whitespace-nowrap text-[#391713]">
                {portion.name} ({portion.slices})
              </span>

              {/* 2px/2px dash filler - flex-1 + min-w-0 so it shrinks and never overflows */}
              <div className="mx-2 h-px min-w-0 flex-1 bg-[repeating-linear-gradient(90deg,#FFD8C7_0_2px,transparent_2px_4px)]"></div>

              <span className="w-[35px] shrink-0 text-right text-xs font-light text-[#391713]">
                {formatPrice(portion.additionalPrice, portion.currency)}
              </span>

              {/* Radio on every row: outer ring + inner circle (hollow, filled when selected) */}
              <div className="ml-2.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#E95322] bg-white">
                <div
                  className={`h-[9px] w-[9px] rounded-full ${
                    isSelected ? 'bg-[#E95322]' : 'border border-[#E95322]'
                  }`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
