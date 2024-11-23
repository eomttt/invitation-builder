import { differenceInMinutes } from 'date-fns';
import { useEffect, useState } from 'react';

import { CountDown } from './CountDown';

const bornDate = new Date(2024, 7, 27, 11, 49);

const Title = () => {
  const [count, setRenderCount] = useState(0);

  const diffMinutes = differenceInMinutes(new Date(), bornDate);

  const days = Math.floor(diffMinutes / (24 * 60));
  const hours = Math.floor((diffMinutes % (24 * 60)) / 60);
  const minutes = diffMinutes % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setRenderCount(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="h-title flex text-white items-center justify-between px-10">
      <span className="text-title">채이의 백일을 축하합니다.</span>
      <div className="flex gap-10 text-title">
        <div className="flex items-center justify-center">
          <CountDown counter={Math.floor(days / 100)} />
          <CountDown counter={Math.floor(days / 10)} />
          <CountDown counter={days % 10} />일
        </div>
        <div className="flex items-center justify-center">
          <CountDown maxCount={6} counter={Math.floor(hours / 10)} />
          <CountDown counter={hours % 10} />
          시간
        </div>
        <div className="flex items-center justify-center">
          <CountDown maxCount={6} counter={Math.floor(minutes / 10)} />
          <CountDown counter={minutes % 10} />분
        </div>
      </div>
    </div>
  );
};

export { Title };
