import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

const CountdownTimer = ({ endDate }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    // Function to update the countdown
        const updateCountdown = () => {
      const now = new Date().getTime();
      const endDateTime = new Date(endDate).getTime();
      const distance = endDateTime - now;

      if (distance < 0) {
        setCountdown("Adventure awaits!!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const timer = setInterval(updateCountdown, 1000);

        // Cleanup on component unmount
        return () => clearInterval(timer);
    }, [endDate]);
  return (
    <Badge className="countdown-badge">{countdown}</Badge>
  );
};

export default CountdownTimer;

