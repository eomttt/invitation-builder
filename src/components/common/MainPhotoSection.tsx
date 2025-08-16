'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const MainPhotoSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const texts = [
    '안녕하세요.',
    '엄채이 입니다.',
    '제 생일을 축하해주셔서',
    '감사합니다.',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // InvitationHeader 높이를 고려한 오프셋 계산
      const invitationHeaderHeight = 200; // 대략적인 헤더 높이
      const mainPhotoSectionStart = invitationHeaderHeight;

      // MainPhotoSection 영역에 진입했는지 확인
      if (scrollY >= mainPhotoSectionStart) {
        // MainPhotoSection 내에서의 진행률 계산 (400vh 영역)
        const sectionScrollY = scrollY - mainPhotoSectionStart;
        const progress = Math.min(
          1,
          Math.max(0, sectionScrollY / (windowHeight * 4))
        );
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col px-4 overflow-hidden">
      {/* 백그라운드 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_1.JPG"
          alt="채이 메인 사진"
          fill
          className="object-cover"
          priority
        />
        {/* 오버레이 - 텍스트 가독성을 위한 어두운 레이어 */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* 텍스트 콘텐츠 - 상단 위치 */}
      <div className="relative z-10 text-center max-w-2xl mx-auto pt-16 md:pt-20">
        {texts.map((text, index) => {
          // 각 텍스트가 나타나는 타이밍 계산 - 2/3 지점(0.67)까지 모든 텍스트 완료
          const textStartPoint = index * 0.12; // 각 텍스트 시작점을 더 빠르게
          const textProgress = Math.max(
            0,
            Math.min(1, (scrollProgress - textStartPoint) * 7) // 더 빠른 애니메이션
          );

          return (
            <div
              key={index}
              className="mb-6 md:mb-8"
              style={{
                opacity: textProgress,
                transform: `translateY(${(1 - textProgress) * 30}px)`,
                transition: 'all 0.3s ease-out',
              }}
            >
              <p
                className="font-light text-white font-nanum-myeongjo leading-relaxed drop-shadow-lg"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  lineHeight: '1.4',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                {text}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export { MainPhotoSection };
