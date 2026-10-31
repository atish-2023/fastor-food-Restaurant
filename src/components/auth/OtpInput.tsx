import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  error?: string;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Array of 6 characters
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '');

  // Auto-focus next input
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;

    const char = val.slice(-1);
    const newOtpArr = [...digits];
    newOtpArr[index] = char;
    const newOtp = newOtpArr.join('').slice(0, 6);
    onChange(newOtp);

    // Focus next box
    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move back and clear previous
        const newOtpArr = [...digits];
        newOtpArr[index - 1] = '';
        onChange(newOtpArr.join(''));
        inputsRef.current[index - 1]?.focus();
      } else {
        const newOtpArr = [...digits];
        newOtpArr[index] = '';
        onChange(newOtpArr.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      onChange(pastedData);
      const targetIndex = Math.min(pastedData.length, 5);
      inputsRef.current[targetIndex]?.focus();
    }
  };

  useEffect(() => {
    // Focus first empty input on mount
    const firstEmptyIndex = digits.findIndex((d) => !d);
    const target = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
    inputsRef.current[target]?.focus();
  }, []);

  // Fixed 35x48 boxes, grey 1px border, thin orange caret in the active one
  const boxClass = `h-[48px] w-[35px] rounded-[4px] border bg-white text-center text-lg font-bold text-[#292E39] caret-[#FF5701] outline-none transition-colors ${
    error ? 'border-red-400' : 'border-[#D5D5D5]'
  }`;

  return (
    <div className="w-full">
      {/* 6 boxes, left aligned, with a dash between box 3 and box 4 */}
      <div className="flex items-center gap-[11px]">
        {digits.map((digit, idx) => (
          <React.Fragment key={idx}>
            {idx === 3 && (
              <span className="flex-none text-base font-medium text-[#696969] select-none">
                -
              </span>
            )}
            <input
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(idx, e)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              disabled={disabled}
              className={boxClass}
            />
          </React.Fragment>
        ))}
      </div>

      {error && <p className="mt-2 text-center text-xs text-red-500">{error}</p>}
    </div>
  );
};
