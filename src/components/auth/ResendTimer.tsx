import React from 'react';

interface ResendTimerProps {
  formattedTime: string;
  isExpired: boolean;
  onResend: () => void;
  className?: string;
}

export const ResendTimer: React.FC<ResendTimerProps> = ({
  formattedTime,
  isExpired,
  onResend,
  className = '',
}) => {
  return (
    <div className={`text-[13px] font-normal text-[#292E39] ${className}`}>
      {isExpired ? (
        <span>
          Didn't receive code?{' '}
          <button
            type="button"
            onClick={onResend}
            className="cursor-pointer font-semibold text-[#FF5701] hover:underline"
          >
            Resend Code
          </button>
        </span>
      ) : (
        <span>
          I didn't receive a code{' '}
          <span className="text-[#FF5701]">({formattedTime})</span>
        </span>
      )}
    </div>
  );
};
