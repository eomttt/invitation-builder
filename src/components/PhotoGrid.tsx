'use client';

import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';

// 스티커 컴포넌트
const Sticker = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`absolute z-10 ${className}`}
      style={{ transform: 'rotate(-12deg)' }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* 스티커 배경 */}
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="#FF6B9D"
          stroke="#FF4081"
          strokeWidth="2"
        />
        {/* 하트 모양 */}
        <path
          d="M40 55C40 55 25 45 25 35C25 28 30 25 35 25C37.5 25 40 27 40 30C40 27 42.5 25 45 25C50 25 55 28 55 35C55 45 40 55 40 55Z"
          fill="white"
        />
        {/* 텍스트 */}
        <text
          x="40"
          y="68"
          textAnchor="middle"
          className="text-xs font-bold fill-white"
          style={{ fontSize: '10px' }}
        >
          1st
        </text>
      </svg>
    </div>
  );
};

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

      // PhotoGrid 섹션의 시작점 계산
      // InvitationHeader(~200px) + MainPhotoSection(400vh) = PhotoGrid 섹션 시작점
      const invitationHeaderHeight = 200;
      const mainPhotoSectionHeight = windowHeight * 4;
      const photoGridSectionStart =
        invitationHeaderHeight + mainPhotoSectionHeight;

      // PhotoGrid 섹션에 진입했을 때부터 효과 시작
      if (scrollY >= photoGridSectionStart) {
        const photoGridScrollY = scrollY - photoGridSectionStart;
        // 300vh 컨테이너 내에서 200vh 지점까지 컬러 변환
        const progress = Math.min(
          1,
          Math.max(0, photoGridScrollY / (windowHeight * 2))
        );
        setFilterValue(progress);
      } else {
        // PhotoGrid 섹션 진입 전에는 완전 흑백
        setFilterValue(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`flex items-center justify-center px-4 ${className}`}
      style={{ backgroundColor: '#4a4a4a' }}
    >
      <div className="w-full max-w-5xl relative flex items-center justify-center h-full overflow-visible">
        <PhotoGridContent
          images={images}
          style={{
            filter: 'grayscale(1) saturate(0.3) brightness(0.7)',
          }}
        />
        <PhotoGridContent
          images={images}
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
        />
      </div>
    </div>
  );
};

interface PhotoGridContentProps {
  images: {
    src: string;
    alt: string;
  }[];
  style: CSSProperties;
}
const PhotoGridContent = ({ images, style }: PhotoGridContentProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-visible">
      <div className="relative">
        <div
          className="transition-all duration-500 ease-out bg-black p-3 md:p-4 w-full max-w-md md:max-w-lg lg:max-w-xl relative"
          style={style}
        >
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {images.map((image, index) => (
              <div key={index} className="aspect-[2/3] overflow-hidden w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute -top-8 -left-4 md:-top-8 md:-left-8"
          style={{ filter: 'none' }}
        >
          <Sticker />
        </div>
      </div>
    </div>
  );
};

export { PhotoGrid };
