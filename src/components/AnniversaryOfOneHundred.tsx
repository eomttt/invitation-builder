'use client';

import { useEffect, useState } from 'react';

import { GallerySection } from './GallerySection';
import { MainSection } from './MainSection';
import { ShowSection } from './ShowSection';

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
      <div className="w-full max-w-600 overflow-x-clip">
        <MainSection />
        <ShowSection scrollY={scrollY} />
        <GallerySection />
      </div>
    </div>
  );
};

export { AnniversaryOfOneHundred };
