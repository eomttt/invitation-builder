import { differenceInMinutes } from 'date-fns';
import { useEffect, useState } from 'react';

const bornDate = new Date(2024, 7, 27, 11, 49);

const CountDown = () => {
  const [, setRenderCount] = useState(0);

  const diffMinutes = differenceInMinutes(new Date(), bornDate);

  const days = Math.floor(diffMinutes / (24 * 60));
  const hours = Math.floor((diffMinutes % (24 * 60)) / 60);
  const mins = diffMinutes % 60;

  const hoursText = hours < 10 ? `0${hours}` : hours;
  const minsText = mins < 10 ? `0${mins}` : mins;

  useEffect(() => {
    const timer = setInterval(() => {
      setRenderCount(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="text-center">
      <div className="text-title text-gray-500 font-medium">
        우리 아이가 태어난 지
      </div>
      <div className="text-title font-bold text-pink-600 mb-2">
        {days}일 {hoursText}시간 {minsText}분
      </div>
    </div>
  );
};

export { CountDown };
