import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../api/fastorApi';
import { StatusBar } from '../components/common/StatusBar';
import { BackButton } from '../components/common/BackButton';
import { Button } from '../components/common/Button';
import { PhoneInput } from '../components/auth/PhoneInput';
import { NumericKeypad } from '../components/common/NumericKeypad';

export const PhonePage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Keypad click handlers
  const handleDigitPress = (digit: string) => {
    if (phone.length < 10) {
      setPhone((prev) => prev + digit);
      setError('');
    }
  };

  const handleDeletePress = () => {
    setPhone((prev) => prev.slice(0, -1));
    setError('');
  };

  const handleGetOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await sendOtp(phone);
      sessionStorage.setItem('phone', phone);
      navigate('/otp');
    } catch (e: any) {
      setError(e.message || 'Server not reachable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[844px] flex-col bg-white font-mulish select-none">
      {/* iOS Status Bar */}
      <StatusBar />

      {/* Top Back Navigation */}
      <div className="px-5 pt-4 pb-5">
        <BackButton onClick={() => navigate('/')} />
      </div>

      <form onSubmit={handleGetOtp} className="flex flex-1 flex-col px-5">
        {/* Main Title */}
        <h1 className="text-2xl leading-8 font-bold tracking-normal text-[#292E39]">
          Sign Up to Fastor
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm leading-5 font-normal text-[#696969]">
          Let us know your mobile number and we will send you an OTP for verification.
        </p>

        {/* Phone input */}
        <div className="mt-7">
          <PhoneInput
            value={phone}
            onChange={(val) => {
              setPhone(val);
              setError('');
            }}
            error={error}
          />
        </div>

        {/* Bottom group, pinned just above the keypad */}
        <div className="mt-auto pt-8 pb-5">
          <Button type="submit" variant="cta" isLoading={isLoading}>
            Get OTP
          </Button>

          <p className="mt-3 text-center text-[10px] leading-[15px] font-normal text-[#696969]">
            By clicking, I accept the{' '}
            <span className="font-medium text-[#292E39] cursor-pointer">Terms &amp; Conditions</span>{' '}
            and{' '}
            <span className="font-medium text-[#292E39] cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </form>

      {/* iOS Soft Numeric Keypad at bottom */}
      <NumericKeypad
        onNumberPress={handleDigitPress}
        onDeletePress={handleDeletePress}
      />
    </div>
  );
};
