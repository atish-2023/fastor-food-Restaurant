import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'pill' | 'pill-light' | 'cta';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = true,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  let baseStyles =
    'transition-all duration-150 inline-flex items-center justify-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] whitespace-nowrap';

  let variantStyles = '';

  switch (variant) {
    case 'primary':
      // Orange ~#FF5A00, radius ~10px, height ~50px
      variantStyles = 'bg-[#FF5A00] hover:bg-[#E65100] text-white py-3.5 px-6 rounded-[10px] text-base shadow-sm font-bold';
      break;
    case 'secondary':
      variantStyles = 'bg-[#FFD9C7] hover:bg-[#FFCBB3] text-[#FF5A00] py-3.5 px-6 rounded-[10px] text-base font-bold';
      break;
    case 'cta':
      // Sign Up / Continue: 334x48, radius 10, #FF5701, medium (not bold)
      variantStyles =
        'h-12 rounded-[10px] bg-[#FF5701] hover:bg-[#E64E00] text-base font-medium tracking-[0.05em] text-white';
      break;
    case 'pill':
      // Solid orange small pill (Cancel Order) - 80x26
      variantStyles = 'h-[26px] w-20 px-3 rounded-full text-[11px] font-medium bg-[#E95322] hover:bg-[#D6491D] text-white';
      break;
    case 'pill-light':
      // Light peach pill (Track Driver) - 100x26
      variantStyles = 'h-[26px] w-[100px] px-3 rounded-full text-[11px] font-medium bg-[#FFDCCF] hover:bg-[#FFD0BE] text-[#E95322]';
      break;
  }

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
