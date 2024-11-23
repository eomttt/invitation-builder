'use client';

import { useEffect, useState } from 'react';

import { CardSections } from './CardSections';
import { Title } from './Title';

const AnniversaryOfOneHundred = () => {
  const [scrollY, setScrollY] = useState(0);

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
        className="bg-black  w-full max-w-1024 overflow-x-clip"
        style={{
          paddingBottom: `${window.innerHeight}px`,
        }}
      >
        <Title />
        <div
          className="flex flex-col"
          style={{
            gap: `${window.innerHeight}px`,
          }}
        >
          <CardSections
            titleHeight={64}
            section={0}
            scrollY={scrollY}
            dir="right"
            cards={['1', '2', '3', '4', '5']}
          />
          <CardSections
            titleHeight={64}
            section={1}
            scrollY={scrollY}
            dir="left"
            cards={['1', '2', '3', '4', '5']}
          />
          <CardSections
            titleHeight={64}
            section={2}
            scrollY={scrollY}
            dir="right"
            cards={['1', '2', '3', '4', '5']}
          />
          <CardSections
            titleHeight={64}
            section={3}
            scrollY={scrollY}
            dir="left"
            cards={['1', '2', '3', '4', '5']}
          />
          <CardSections
            titleHeight={64}
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
