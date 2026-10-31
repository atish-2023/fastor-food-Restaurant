import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
}) => {
  const circleClass =
    'flex h-5 w-5 items-center justify-center rounded-full bg-[#E95322] text-white transition-all hover:bg-[#D64218] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="flex items-center gap-2.5">
      {/* Decrement Button (20px orange circle) */}
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={circleClass}
      >
        <Minus className="h-3 w-3 stroke-[3]" />
      </button>

      {/* Quantity value */}
      <span className="min-w-5 text-center text-[20px] leading-none font-normal text-[#391713]">
        {quantity}
      </span>

      {/* Increment Button (20px orange circle) */}
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={circleClass}
      >
        <Plus className="h-3 w-3 stroke-[3]" />
      </button>
    </div>
  );
};
