"use client";
import { timestampDeltaNow } from "@/utils/utils";
import React, { useState, useEffect } from "react";

interface CountdownProps {
  endTime: number; // endTime in seconds
}

const CountdownTimer: React.FC<CountdownProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateTimer = () => {
      const difference = timestampDeltaNow(endTime);

      if (difference <= 0) {
        setTimeLeft(" Expired");
        return;
      }

      const hours = Math.floor(difference / 3600);
      const minutes = Math.floor((difference % 3600) / 60);
      const seconds = difference % 60;

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer(); // Initial call to set timer immediately
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [endTime]);

  return <div>{timeLeft}</div>;
};

export default CountdownTimer;
