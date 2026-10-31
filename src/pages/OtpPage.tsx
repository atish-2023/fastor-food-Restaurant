import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp } from '../api/fastorApi';
import { StatusBar } from '../components/common/StatusBar';
import { BackButton } from '../components/common/BackButton';
import { Button } from '../components/common/Button';
import { OtpInput } from '../components/auth/OtpInput';
import { ResendTimer } from '../components/auth/ResendTimer';
import { NumericKeypad } from '../components/common/NumericKeypad';
import { useCountdown } from '../hooks/useCountdown';
import { useAuth } from '../hooks/useAuth';
import { saveModeForPhone } from '../hooks/useDisplayMode';

export const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const phone = sessionStorage.getItem('phone') || '';
  const formattedPhone = phone.length > 5 ? `${phone.slice(0, 5)} ${phone.slice(5)}` : phone;

  const { formattedTime, isExpired, restart } = useCountdown(30);

  // Soft keypad handlers
  const handleDigitPress = (digit: string) => {
    if (otp.length < 6) {
      const nextOtp = otp + digit;
      setOtp(nextOtp);
      setError('');
      if (nextOtp.length === 6) {
        verifyCode(nextOtp);
      }
    }
  };

  const handleDeletePress = () => {
    setOtp((prev) => prev.slice(0, -1));
    setError('');
  };

  const handleResend = async () => {
    try {
      await sendOtp(phone);
      restart(30);
      setOtp('');
      setError('');
    } catch (e: any) {
      setError(e.message || 'Server not reachable');
    }
  };

  const verifyCode = async (codeToVerify: string) => {
    if (codeToVerify.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (import.meta.env.DEV) console.log('Staging accepts test OTP: 123456');
      const { token, name } = await verifyOtp(phone, codeToVerify);
      loginWithToken(token, { name, phone });
      // Demo phone -> live API data; any other number -> Figma sample content.
      saveModeForPhone(phone);
      sessionStorage.setItem('justVerified', '1');
      navigate('/home');
    } catch (e: any) {
      setError(e.message || 'Invalid or expired OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    verifyCode(otp);
  };

  return (
    <div className="flex min-h-[844px] flex-col bg-white font-mulish select-none">
      {/* Status Bar */}
      <StatusBar />

      {/* Top Back Navigation */}
      <div className="px-5 pt-4 pb-5">
        <BackButton onClick={() => navigate('/signup')} />
      </div>

      <form onSubmit={handleContinue} className="flex flex-1 flex-col px-5">
        {/* Main Title */}
        <h1 className="text-2xl leading-8 font-bold tracking-normal text-[#292E39]">
          6-digit code
        </h1>

        {/* Subtitle with the number on its own line */}
        <p className="mt-2 text-sm leading-5 font-normal text-[#696969]">
          Please enter the code we've sent to
          <span className="mt-1 block text-sm font-bold text-[#292E39]">
            +91 {formattedPhone}
          </span>
        </p>

        {/* 6-box input */}
        <div className="mt-7">
          <OtpInput
            value={otp}
            onChange={(val) => {
              setOtp(val);
              setError('');
              if (val.length === 6) {
                verifyCode(val);
              }
            }}
            error={error}
          />
        </div>

        {/* Countdown / Resend */}
        <div className="mt-3.5">
          <ResendTimer
            formattedTime={formattedTime}
            isExpired={isExpired}
            onResend={handleResend}
          />
        </div>

        {/* Continue, pinned just above the keypad */}
        <div className="mt-auto pt-8 pb-5">
          <Button
            type="submit"
            variant="cta"
            isLoading={isLoading}
            disabled={otp.length !== 6}
          >
            Continue
          </Button>
        </div>
      </form>

      {/* iOS Soft Keypad */}
      <NumericKeypad
        onNumberPress={handleDigitPress}
        onDeletePress={handleDeletePress}
      />
    </div>
  );
};
