import React from 'react';

interface LocationHeaderProps {
  locationTitle?: string;
  address?: string;
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
  locationTitle = 'Current Locations',
  address = 'Model Town, New Delhi',
}) => {
  return (
    <div className="mb-4">
      <span className="text-[11px] font-medium text-[#828282] uppercase tracking-wide block">
        {locationTitle}
      </span>
      <h3 className="text-sm font-bold text-[#1E1B18] tracking-tight mt-0.5">
        {address}
      </h3>
    </div>
  );
};
