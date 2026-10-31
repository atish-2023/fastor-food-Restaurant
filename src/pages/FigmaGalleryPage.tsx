import React from 'react';
import { PhonePage } from './PhonePage';
import { OtpPage } from './OtpPage';
import { HomePage } from './HomePage';
import { ItemDetailPage } from './ItemDetailPage';

export const FigmaGalleryPage: React.FC = () => {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Figma Mobile App Design Specification (All 4 Screens)
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Pixel-perfect recreation of the 390px mobile frames matching the Figma design reference.
        </p>
      </div>

      {/* Grid of all 4 mobile frames */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-center">
        {/* Screen 1: Sign Up */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            1. Signup
          </span>
          <div className="w-[320px] sm:w-[360px] min-h-[760px] bg-white rounded-[32px] overflow-hidden shadow-xl border-4 border-gray-800 scale-95 transform-gpu origin-top">
            <PhonePage />
          </div>
        </div>

        {/* Screen 2: OTP 6-Digit */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            2. 6-digit code
          </span>
          <div className="w-[320px] sm:w-[360px] min-h-[760px] bg-white rounded-[32px] overflow-hidden shadow-xl border-4 border-gray-800 scale-95 transform-gpu origin-top">
            <OtpPage />
          </div>
        </div>

        {/* Screen 3: Home */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            3. Home & Orders
          </span>
          <div className="w-[320px] sm:w-[360px] min-h-[760px] bg-white rounded-[32px] overflow-hidden shadow-xl border-4 border-gray-800 scale-95 transform-gpu origin-top">
            <HomePage />
          </div>
        </div>

        {/* Screen 4: Item Detail */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            4. Item detail
          </span>
          <div className="w-[320px] sm:w-[360px] min-h-[760px] bg-white rounded-[32px] overflow-hidden shadow-xl border-4 border-gray-800 scale-95 transform-gpu origin-top">
            <ItemDetailPage />
          </div>
        </div>
      </div>
    </div>
  );
};
