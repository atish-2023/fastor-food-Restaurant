import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/common/StatusBar';
import { Button } from '../components/common/Button';
import { SafeImage } from '../components/common/SafeImage';
import { QuantityStepper } from '../components/detail/QuantityStepper';
import { PortionSelector } from '../components/detail/PortionSelector';
import { PIZZA_DETAIL, FoodDetail } from '../api/foodApi';
import { formatPrice } from '../utils/formatPrice';
import { useDisplayMode } from '../hooks/useDisplayMode';
import { FIGMA_DETAIL } from '../data/figmaSample';

export const ItemDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const mode = useDisplayMode();
  // Data from the tapped card (router state); fallback keeps the Figma placeholder
  const stateItem = (useLocation().state || {}) as Partial<FoodDetail>;
  // figma mode ignores the tapped card and shows the exact Figma detail frame;
  // api mode shows the tapped restaurant (name + address) over the static portions.
  const item: FoodDetail =
    mode === 'figma'
      ? (FIGMA_DETAIL as unknown as FoodDetail)
      : {
          ...PIZZA_DETAIL,
          ...stateItem,
          portions: PIZZA_DETAIL.portions,
          basePrice: PIZZA_DETAIL.basePrice,
          currency: PIZZA_DETAIL.currency,
          // Description slot shows the API address; portions/price stay static
          description: stateItem.address || PIZZA_DETAIL.description,
        };

  const [quantity, setQuantity] = useState(3); // 3 as shown in Figma screenshot!
  const [selectedPortionId, setSelectedPortionId] = useState('jumbo'); // Jumbo selected in Figma screenshot!
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      navigate('/home');
    }, 1200);
  };

  return (
    <div className="flex min-h-[844px] flex-col bg-white font-league select-none">
      {/* Status Bar */}
      <StatusBar />

      <div className="flex flex-1 flex-col px-[23px] pb-4">
        {/* Hero image (radius 32px). No back arrow: Figma has none, browser/route back still works. */}
        <div className="mt-3 h-[207px] w-full overflow-hidden rounded-[32px]">
          <SafeImage
            src={item.image}
            fallback={item.fallback}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Divider */}
        <div className="mt-2.5 h-px w-full bg-[#FFD8C7]"></div>

        {/* Price and Quantity Stepper row */}
        <div className="flex h-11 w-full items-center justify-between">
          <span className="text-[22px] leading-none font-bold text-[#E95322]">
            {formatPrice(item.basePrice, item.currency)}
          </span>

          <QuantityStepper
            quantity={quantity}
            onIncrement={() => setQuantity((q) => q + 1)}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          />
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#FFD8C7]"></div>

        {/* Title & Description */}
        <h1 className="mt-3.5 text-xl font-medium text-[#391713]">
          {item.name}
        </h1>
        <p className="mt-1.5 w-full break-words text-base leading-[18px] font-light text-[#391713]">
          {item.description}
        </p>

        {/* Portion Selector (Personal, Medium, Familiar, Jumbo) — static, API has no portions */}
        <PortionSelector
          portions={item.portions}
          selectedId={selectedPortionId}
          onSelect={(id) => setSelectedPortionId(id)}
        />

        {/* Sticky Bottom Actions */}
        <div className="mt-auto pt-6">
          <Button variant="cta" onClick={handleAddToCart} isLoading={isAdded}>
            {isAdded ? 'Added to Cart ✓' : 'Add to cart'}
          </Button>

          {/* Home Indicator */}
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-black/80"></div>
        </div>
      </div>
    </div>
  );
};
