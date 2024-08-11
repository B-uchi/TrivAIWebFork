import { useEffect, useState, useRef } from 'react';

const useCountdown = (initialDuration) => {
  const [time, setTime] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const initialDurationRef = useRef(initialDuration);

  // Converts time to HH:MM:SS format
  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  useEffect(() => {
    setTime(initialDuration);
    initialDurationRef.current = initialDuration;
    setIsActive(false); // Reset the countdown state when initialDuration changes
  }, [initialDuration]);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsActive(false); // Stop the countdown when time reaches 0
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const startCountdown = (newDuration) => {
    if (newDuration !== undefined) {
      setTime(newDuration);
    }
    setIsActive(true);
  };

  const resetCountdown = () => {
    setTime(initialDurationRef.current);
    setIsActive(false);
  };

  return { time: formatTime(time), startCountdown, resetCountdown };
};

export default useCountdown;
