import React from 'react';

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
0
  return (
    <div className="flex items-center">
      <div className="bg-[#14161A] text-white px-3 py-1 rounded font-mono">{String(minutes).padStart(2, '0')}</div>
      <span className="mx-1">:</span>
      <div className="bg-[#14161A] text-white px-3 py-1 rounded font-mono">{String(seconds).padStart(2, '0')}</div>
    </div>
  );
};

export default Timer;
