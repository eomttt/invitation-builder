'use client';

import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';

// 스카치테이프 컴포넌트
const ScotchTape = ({
  className = '',
  rotation = 0,
}: {
  className?: string;
  rotation?: number;
}) => {
  return (
    <div
      className={`absolute z-10 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29.726 5.568H26.432V2.271H23.135V0.393005L0.395004 23.135H2.274V26.432H5.571L5.572 29.725H8.868V31.606L31.605 8.863H29.726V5.568Z"
          fill="rgba(255,255,255,0.3)"
        />
      </svg>
    </div>
  );
};

// 돌잔치 문구 배열
const BIRTHDAY_MESSAGES = [
  '우리 아기의 첫 번째 생일이에요 💕',
  '소중한 첫돌을 함께 축하해주세요',
  '건강하고 예쁘게 자라준 우리 아가',
  '특별한 하루를 함께 해주셔서 감사해요',
];

interface PhotoGridProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

const PhotoGrid = ({ images, className = '' }: PhotoGridProps) => {
  const [filterValue, setFilterValue] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<typeof images>([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [currentImages, setCurrentImages] = useState(images.slice(0, 4));
  const [currentMessage, setCurrentMessage] = useState(BIRTHDAY_MESSAGES[0]);

  // 16장 이미지로 제한하고 초기 셔플
  useEffect(() => {
    const limitedImages = images.slice(0, 16);
    const shuffled = [...limitedImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    setCurrentImages(shuffled.slice(0, 4));
    setCurrentMessage(
      BIRTHDAY_MESSAGES[Math.floor(Math.random() * BIRTHDAY_MESSAGES.length)]
    );
  }, [images]);

  // 다음 4장 보여주기 함수
  const shuffleImages = () => {
    const nextBatch = (currentBatch + 1) % 4;
    
    // 4번째 배치까지 모두 본 경우, 다시 랜덤 셔플
    if (nextBatch === 0) {
      const limitedImages = images.slice(0, 16);
      const newShuffled = [...limitedImages].sort(() => Math.random() - 0.5);
      setShuffledImages(newShuffled);
      setCurrentImages(newShuffled.slice(0, 4));
    } else {
      // 다음 4장 보여주기
      const startIndex = nextBatch * 4;
      setCurrentImages(shuffledImages.slice(startIndex, startIndex + 4));
    }
    
    setCurrentBatch(nextBatch);
    setCurrentMessage(
      BIRTHDAY_MESSAGES[Math.floor(Math.random() * BIRTHDAY_MESSAGES.length)]
    );
  };

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
          images={currentImages}
          currentMessage={currentMessage}
          onShuffle={shuffleImages}
          style={{
            filter: 'grayscale(1) saturate(0.3) brightness(0.7)',
          }}
        />
        <PhotoGridContent
          images={currentImages}
          currentMessage={currentMessage}
          onShuffle={shuffleImages}
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
  currentMessage: string;
  onShuffle: () => void;
  style: CSSProperties;
}
const PhotoGridContent = ({
  images,
  currentMessage,
  onShuffle,
  style,
}: PhotoGridContentProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-visible">
      <div className="relative">
        <div
          className="transition-all duration-500 ease-out bg-black p-3 pb-16 w-full max-w-md md:max-w-lg lg:max-w-xl relative"
          style={style}
        >
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {images.map((image, index) => (
              <div key={index} className="aspect-[2/3] overflow-hidden w-full h-[200px] md:h-[250px] lg:h-[300px] bg-gray-200">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={450}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm">이미지 로드 실패</div>';
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -top-4 -left-4" style={{ filter: 'none' }}>
          <ScotchTape />
        </div>
        <div className="absolute bottom-12 right-12" style={{ filter: 'none' }}>
          <ScotchTape rotation={180} />
        </div>
        {/* 하단 영역: 문구(왼쪽) + 새로고침 버튼(오른쪽) */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-full pl-3 pr-3">
          <div className="flex-1 mr-2">
            <p
              className="text-white text-xs md:text-sm leading-tight font-single-day"
              style={{
                filter: 'none',
              }}
            >
              {currentMessage}
            </p>
          </div>
          <button
            onClick={onShuffle}
            className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-opacity-30 rounded-full transition-all duration-200 relative z-20"
            style={{ filter: 'none' }}
            aria-label="새로고침"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className="md:w-4 md:h-4"
            >
              <path
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export { PhotoGrid };
