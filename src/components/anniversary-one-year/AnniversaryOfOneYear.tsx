'use client';

import { useEffect, useState } from 'react';

import { GallerySection } from '../common/GallerySection';
import { MapSection } from '../common/MapSection';
import { ShowSection } from '../common/ShowSection';

import { MainSectionOneYear } from './MainSectionOneYear';

const AnniversaryOfOneYear = () => {
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
        <MainSectionOneYear />
        <ShowSection scrollY={scrollY} />
        <GallerySection />
        <MapSection />
      </div>
    </div>
  );
};

export { AnniversaryOfOneYear };
