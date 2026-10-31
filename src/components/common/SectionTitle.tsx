import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  subtitle,
  className = '',
  actionText,
  onActionClick,
}) => {
  return (
    <div className={`flex items-center justify-between mb-3 ${className}`}>
      <div>
        {/* Dark brown sampled from the Figma crop (#391713), Plus Jakarta Sans via --font-heading */}
        <h2 className="text-lg font-bold text-[#391713] tracking-tight">{children}</h2>
        {subtitle && <p className="text-xs text-[#828282] mt-0.5">{subtitle}</p>}
      </div>
      {actionText && (
        <button
          type="button"
          onClick={onActionClick}
          className="text-xs font-semibold text-[#FF5A00] hover:underline"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
