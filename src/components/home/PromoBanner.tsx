import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DOT_COUNT = 5;
const SLIDE_MS = 3000;

interface PromoBannerProps {
  onBannerClick?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onBannerClick }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  // Auto-slide through the dots
  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % DOT_COUNT), SLIDE_MS);
    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    if (onBannerClick) {
      onBannerClick();
    } else {
      navigate('/detail/pizza');
    }
  };

  return (
    <div className="my-5">
      {/* banner.png artwork already holds the orange panel, yellow arcs and pizza */}
      <div
        onClick={handleClick}
        className="relative cursor-pointer overflow-hidden rounded-xl shadow-md transition-transform active:scale-[0.99]"
      >
        <img
          src="/assets/fastor-1.png"
          alt="Experience our delicious new dish - 30% OFF"
          className="block h-auto w-full"
        />

        {/* Text centred inside the left orange area only */}
        <div className="absolute inset-y-0 left-0 flex w-[45%] flex-col items-center justify-center px-2 text-center">
          <p className="whitespace-pre-line break-words text-sm leading-snug text-white">
            {'Experience our\ndelicious new dish'}
          </p>
          <h2 className="mt-1 whitespace-nowrap text-[26px] font-extrabold leading-none tracking-tight text-white">
            30% OFF
          </h2>
        </div>
      </div>

      {/* Flat dashes below the image */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {Array.from({ length: DOT_COUNT }, (_, i) => (
          <span
            key={i}
            className={`h-1 w-6 rounded-full transition-colors ${
              i === active ? 'bg-[#E95322]' : 'bg-[#F3E3A0]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
