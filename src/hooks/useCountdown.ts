import { useState, useEffect, useCallback } from 'react';

export function useCountdown(initialSeconds: number = 30) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const restart = useCallback((newSeconds?: number) => {
    setSecondsLeft(newSeconds !== undefined ? newSeconds : initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  // Format as MM:SS (e.g., 00:30)
  const formattedTime = `00:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

  return {
    secondsLeft,
    formattedTime,
    isExpired: secondsLeft === 0,
    restart,
  };
}
