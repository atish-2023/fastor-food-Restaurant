import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

/** Green confirmation pill, centred just below the status bar inside the phone frame */
export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!message) return;
    setShow(true);
    const fadeOut = setTimeout(() => setShow(false), duration - 300);
    const done = setTimeout(onClose, duration);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(done);
    };
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      className={`absolute top-11 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-xl bg-green-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Check className="w-3.5 h-3.5 shrink-0" />
      {message}
    </div>
  );
};
