'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PhotoGridProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

const PhotoGrid = ({ images, className = '' }: PhotoGridProps) => {
  const [filterValue, setFilterValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 300vh 컨테이너 내에서 스크롤 위치에 따라 색상 효과 계산
      // 0 (흑백)에서 1 (컬러)로 변환
      // 200vh 지점에서 컬러 효과 완성, 나머지 100vh는 여유 공간
      const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 2)));
      setFilterValue(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`flex-1 flex items-center justify-center px-4 ${className}`}
    >
      <div className="w-full max-w-4xl relative flex items-center justify-center">
        {/* 흑백 컨테이너 (배경) */}
        <div className="absolute inset-0  flex items-center justify-center">
          <div
            className="transition-all duration-500 ease-out grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto"
            style={{
              filter: 'grayscale(1) saturate(0.3) brightness(0.7)',
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 컬러 컨테이너 (mask로 위에서 아래로 차지) */}
        <div className="absolute inset-0  flex items-center justify-center">
          <div
            className="transition-all duration-500 ease-out grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto"
            style={{
              mask: `linear-gradient(to bottom, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,1) ${filterValue * 100}%, 
            rgba(0,0,0,0) ${filterValue * 100}%, 
            rgba(0,0,0,0) 100%
          )`,
              WebkitMask: `linear-gradient(to bottom, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,1) ${filterValue * 100}%, 
            rgba(0,0,0,0) ${filterValue * 100}%, 
            rgba(0,0,0,0) 100%
          )`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PhotoGrid };
