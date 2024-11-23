'use client';

import { useEffect, useState } from 'react';
import { HoloCard } from 'react-holo-card-effect';

import { CardSections } from './CardSections';
import { Title } from './Title';

const AnniversaryOfOneHundred = () => {
  const [scrollY, setScrollY] = useState(0);

  const containerGap = window.innerHeight / 2;
  const defaultSectionOffset = 64 + containerGap;

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.currentTarget as Window;

      setScrollY(target.scrollY);
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className="bg-black w-full max-w-600 overflow-x-clip"
        style={{
          paddingBottom: `${containerGap}px`,
        }}
      >
        <Title />
        <div
          className="flex items-center justify-center"
          style={{
            height: `${containerGap}px`,
          }}
        >
          <HoloCard
            url={
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2024-11-24+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+1.24.40.png'
            }
            height={300} // optional, default 446
            width={200} // optional, default 320
            showSparkles={false} // optional, default true
          />
        </div>
        <div
          className="flex flex-col"
          style={{
            gap: `${containerGap}px`,
          }}
        >
          <CardSections
            defaultOffsetTop={defaultSectionOffset}
            section={0}
            scrollY={scrollY}
            dir="right"
            cards={['1', '2', '3', '4', '5']}
          />
          <CardSections
            defaultOffsetTop={defaultSectionOffset}
            section={1}
            scrollY={scrollY}
            dir="left"
            cards={['1', '2', '3', '4', '5']}
          />
          <CardSections
            defaultOffsetTop={defaultSectionOffset}
            section={2}
            scrollY={scrollY}
            dir="right"
            cards={['1', '2', '3', '4', '5']}
          />
          <CardSections
            defaultOffsetTop={defaultSectionOffset}
            section={3}
            scrollY={scrollY}
            dir="left"
            cards={['1', '2', '3', '4', '5']}
          />
          <CardSections
            defaultOffsetTop={defaultSectionOffset}
            section={4}
            scrollY={scrollY}
            dir="right"
            cards={['1', '2', '3', '4', '5']}
          />
        </div>
      </div>
    </div>
  );
};

export { AnniversaryOfOneHundred };
