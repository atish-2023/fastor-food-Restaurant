import React from 'react';

interface UserCardProps {
  userName?: string;
  onCallClick?: () => void;
  onWalletClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  userName = 'Karan',
  onCallClick,
  onWalletClick,
}) => {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      {/* Name / Greeting Pill */}
      <div className="flex-1 h-12 bg-[#F5F5F5] rounded-[14px] px-4 flex items-center shadow-2xs">
        <span className="text-base font-semibold text-[#1E1B18] tracking-tight">
          {userName}
        </span>
      </div>

      {/* Call Button (orange-pink gradient asset) */}
      <button
        type="button"
        onClick={onCallClick}
        aria-label="Call Support"
        className="w-9 h-9 rounded-lg overflow-hidden shrink-0 active:scale-95 transition-all shadow-xs cursor-pointer"
      >
        <img src="/assets/fastor-2.png" alt="" className="w-full h-full object-cover" />
      </button>

      {/* Wallet Button (blue gradient asset) */}
      <button
        type="button"
        onClick={onWalletClick}
        aria-label="Open Wallet"
        className="w-9 h-9 rounded-lg overflow-hidden shrink-0 active:scale-95 transition-all shadow-xs cursor-pointer"
      >
        <img src="/assets/fastor-3.png" alt="" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};
