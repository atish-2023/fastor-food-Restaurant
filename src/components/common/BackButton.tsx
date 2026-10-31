import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  fallbackRoute?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  className = '',
  fallbackRoute = '/',
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackRoute);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Go back"
      className={`inline-flex items-center justify-center p-1.5 -ml-1.5 text-[#FF5A00] hover:opacity-80 active:scale-95 transition-all cursor-pointer ${className}`}
    >
      <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
    </button>
  );
};
