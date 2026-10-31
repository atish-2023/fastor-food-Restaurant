import React from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
  onFocus?: () => void;
  error?: string;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onFocus,
  error,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep only numbers and max 10 digits
    const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(clean);
  };

  // Format display string e.g. "12345 67890"
  const formattedDisplay = value.length > 5 ? `${value.slice(0, 5)} ${value.slice(5)}` : value;

  return (
    <div className="w-full">
      <div
        className={`flex h-12 w-full items-center rounded-[10px] border bg-[#F5F5F5] px-3.5 transition-colors ${
          error ? 'border-red-400' : 'border-[#D8D8D8]'
        }`}
      >
        {/* Country code prefix */}
        <span className="text-sm font-bold text-[#292E39] select-none">+91</span>

        {/* Blinking caret sitting next to the input */}
        <span className="ml-2.5 h-3.5 w-[1.5px] animate-pulse bg-[#FF5701] select-none"></span>

        {/* The dash is only shown while the field is empty */}
        {!value && (
          <span className="ml-[50px] mr-2 text-[13px] font-normal text-[#8A8FA0] select-none">
            -
          </span>
        )}

        {/* Input field */}
        <input
          type="tel"
          inputMode="numeric"
          value={formattedDisplay}
          onChange={handleChange}
          onFocus={onFocus}
          disabled={disabled}
          placeholder="00000"
          className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[13px] font-normal text-[#292E39] caret-transparent outline-none placeholder:text-[#A5A9B8]"
          autoFocus
        />
      </div>

      {error && <p className="mt-1.5 ml-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
