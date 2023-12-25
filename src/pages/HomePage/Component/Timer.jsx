import { Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const CountDownTimer = ({ initialTime, onTimeout }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    // Lấy thời gian trước đó từ local storage
    const savedTime = localStorage.getItem('countDownTimer');
    const savedTimestamp = localStorage.getItem('countdownTimerStamp');

    if (savedTime && savedTimestamp) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
      const remainingTime = Math.max(0, parseInt(savedTime, 10) - elapsedSeconds);
      setTime(remainingTime);
    } else {
      setTime(initialTime);
    }
  }, [initialTime]);

  useEffect(() => {
    // Lưu trữ thời gian và thời điểm lưu trữ vào local storage
    localStorage.setItem('countDownTimer', time);
    localStorage.setItem('countdownTimerStamp', Date.now().toString());

    // Cập nhật thời gian mỗi giây
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          onTimeout();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, onTimeout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <Typography fontWeight='500' fontSize='25px'>{formatTime(time)}</Typography>
    </div>
  );
};

export default CountDownTimer
