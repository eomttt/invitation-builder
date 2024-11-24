'use client';

import { useEffect, useState } from 'react';

import { CardSections } from './CardSections';
import { MainCard } from './MainCard';
import { Title } from './Title';

const AnniversaryOfOneHundred = () => {
  const [scrollY, setScrollY] = useState(0);
  const [containerGap, setContainerGap] = useState(0);

  // Title + MainCard
  const defaultSectionOffset = 76 + 550;

  useEffect(() => {
    setContainerGap(window.innerHeight / 2);
  }, []);

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
        className="bg-yellowLightest w-full max-w-600 overflow-x-clip"
        style={{
          paddingBottom: `${containerGap}px`,
        }}
      >
        <Title />
        <div className="flex items-center justify-center h-500 mb-50">
          <MainCard />
        </div>
        <div
          className="flex flex-col"
          style={{
            gap: `${containerGap}px`,
          }}
        >
          <CardSections
            title="첫 만남"
            defaultOffsetTop={defaultSectionOffset}
            section={0}
            scrollY={scrollY}
            dir="right"
            cards={[
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-1.png',
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-2-hand.png',
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-3.png',
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-4-foot.png',
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-5.png',
            ]}
          />
          <CardSections
            title="집으로..."
            defaultOffsetTop={defaultSectionOffset}
            section={1}
            scrollY={scrollY}
            dir="left"
            cards={[
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/go-home-1.png',
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/go-home-2.png',
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/go-home-3.png',
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/go-home-4.png',
              'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/go-home-5.png',
            ]}
          />
          {/* <CardSections
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
          /> */}
        </div>
      </div>
    </div>
  );
};

export { AnniversaryOfOneHundred };
