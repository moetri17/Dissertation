import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target.getTime() - now.getTime();

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    } else {
      return "Time for the prayer!";
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Text>Countdown: {timeLeft}</Text>
  );
};

export default Countdown;
