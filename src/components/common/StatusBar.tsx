import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface StatusBarProps {
  time?: string;
  dark?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  time = '9:41',
  dark = false,
}) => {
  const textColor = dark ? 'text-white' : 'text-[#1E1B18]';

  return (
    <div className={`w-full flex items-center justify-between px-6 pt-3 pb-2 text-xs font-semibold select-none ${textColor}`}>
      <span className="font-semibold tracking-tight">{time}</span>
      <div className="flex items-center space-x-1.5">
        {/* Cellular bars */}
        <div className="flex items-end space-x-0.5 h-3">
          <span className="w-0.5 h-1 bg-current rounded-xs"></span>
          <span className="w-0.5 h-1.5 bg-current rounded-xs"></span>
          <span className="w-0.5 h-2 bg-current rounded-xs"></span>
          <span className="w-0.5 h-2.5 bg-current rounded-xs"></span>
        </div>
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <Battery className="w-4 h-4 stroke-[2.2]" />
      </div>
    </div>
  );
};
