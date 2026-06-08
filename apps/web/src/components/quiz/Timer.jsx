import React, { useEffect, useState } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

const Timer = ({ timeLimitMinutes, onTimeUp, isActive }) => {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(timeLimitMinutes * 60);

  useEffect(() => {
    setTimeLeftSeconds(timeLimitMinutes * 60);
  }, [timeLimitMinutes]);

  useEffect(() => {
    if (!isActive || timeLeftSeconds <= 0) {
      if (timeLeftSeconds <= 0) {
        onTimeUp();
      }
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isActive, timeLeftSeconds, onTimeUp]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine alert states (e.g. less than 1 minute -> red alert pulse)
  const isUrgent = timeLeftSeconds < 60;

  return (
    <div className={`flex flex-col items-center p-4 bg-card/25 border border-border/40 rounded-2xl w-full text-center transition-all ${
      isUrgent 
        ? 'border-destructive/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-destructive/5' 
        : 'hover:border-primary/30'
    }`}>
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 mb-1">
        <TimerIcon size={12} className={isUrgent ? 'text-destructive animate-spin' : 'text-primary'} />
        Time Left
      </span>
      <span className={`text-2xl font-black font-mono tracking-tight transition-colors ${
        isUrgent ? 'text-destructive animate-pulse' : 'text-foreground'
      }`}>
        {formatTime(timeLeftSeconds)}
      </span>
    </div>
  );
};

export default Timer;
