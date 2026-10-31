import React from 'react';
import { Delete } from 'lucide-react';

interface NumericKeypadProps {
  onNumberPress: (digit: string) => void;
  onDeletePress: () => void;
  className?: string;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onNumberPress,
  onDeletePress,
  className = '',
}) => {
  const keys = [
    { num: '1', letters: '' },
    { num: '2', letters: 'ABC' },
    { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' },
    { num: '5', letters: 'JKL' },
    { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' },
    { num: '8', letters: 'TUV' },
    { num: '9', letters: 'WXYZ' },
  ];

  const keyClass =
    'flex h-12 items-center justify-center rounded-[5px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)] transition-colors active:bg-gray-100';

  return (
    <div className={`w-full select-none bg-[#DDDFE4] p-1.5 ${className}`}>
      <div className="grid grid-cols-3 gap-1.5">
        {keys.map((k) => (
          <button
            key={k.num}
            type="button"
            onClick={() => onNumberPress(k.num)}
            className={`${keyClass} flex-col`}
          >
            <span className="text-[22px] leading-none font-normal text-[#292E39]">{k.num}</span>
            {k.letters && (
              <span className="mt-0.5 text-[9px] leading-none font-normal tracking-[0.1em] text-[#696969] uppercase">
                {k.letters}
              </span>
            )}
          </button>
        ))}

        {/* Bottom row: spacer, 0, delete */}
        <div className="h-12"></div>

        <button type="button" onClick={() => onNumberPress('0')} className={keyClass}>
          <span className="text-[22px] leading-none font-normal text-[#292E39]">0</span>
        </button>

        <button
          type="button"
          onClick={onDeletePress}
          className="flex h-12 items-center justify-center transition-opacity active:opacity-60"
          aria-label="Delete"
        >
          <Delete className="h-6 w-6 text-[#292E39] stroke-[1.8]" />
        </button>
      </div>

      {/* iOS Home Bar Indicator */}
      <div className="mx-auto mt-2 h-1 w-32 rounded-full bg-black/80"></div>
    </div>
  );
};
