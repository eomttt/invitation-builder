'use client';

import { useCallback, useState } from 'react';

interface ShowSectionProps {
  scrollY: number;
}

const ShowSection = ({ scrollY }: ShowSectionProps) => {
  const [clientHeight, setClientHeight] = useState(0);

  const stickyHeight = clientHeight * 4;

  const start = clientHeight;
  const end = stickyHeight;

  const handleChangeClientHeight = useCallback((ele: HTMLDivElement) => {
    setClientHeight(ele.clientHeight);
  }, []);

  const percentage = Math.max(
    0,
    Math.min(1, (scrollY - start) / (end - start))
  );

  return (
    <div style={{ height: `${stickyHeight}px` }}>
      <div className="sticky top-0 h-screen" ref={handleChangeClientHeight}>
        <div className="relative h-full">
          <img
            className="absolute h-full object-cover transition-opacity"
            src="https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-2-hand.png"
            style={{
              opacity: Math.max(0, 1 - percentage * 4),
            }}
          />
          <img
            className="absolute h-full object-cover transition-opacity"
            src="https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-4-foot.png"
            style={{
              opacity:
                percentage <= 0.25
                  ? 4 * percentage
                  : Math.max(0, 2 - 4 * percentage),
            }}
          />
          <img
            className="absolute h-full object-cover transition-opacity"
            src="https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-3.png"
            style={{
              opacity:
                percentage <= 0.5
                  ? Math.max(0, 4 * percentage - 1)
                  : Math.max(0, 3 - 4 * percentage),
            }}
          />
          <img
            className="absolute h-full object-cover transition-opacity"
            src="https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-5.png"
            style={{
              opacity: percentage <= 0.75 ? Math.max(0, 4 * percentage - 2) : 1,
            }}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 text-title text-center flex flex-col gap-10">
            <span
              className="transition-all duration-500"
              style={{
                opacity: percentage >= 0.125 ? 1 : 0,
                transform: `translateY(${percentage >= 0.125 ? 0 : -20}%)`,
              }}
            >
              누구보다
            </span>
            <span
              className="transition-all duration-500"
              style={{
                opacity: percentage >= 0.25 ? 1 : 0,
                transform: `translateY(${percentage >= 0.25 ? 0 : -20}%)`,
              }}
            >
              사랑스럽고
            </span>
            <span
              className="transition-all duration-500"
              style={{
                opacity: percentage >= 0.5 ? 1 : 0,
                transform: `translateY(${percentage >= 0.5 ? 0 : -20}%)`,
              }}
            >
              소중한
            </span>
            <span
              className="transition-all duration-500"
              style={{
                opacity: percentage >= 0.75 ? 1 : 0,
                transform: `translateY(${percentage >= 0.75 ? 0 : -20}%)`,
              }}
            >
              우리 채이
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ShowSection };
