'use client';

import { InvitationHeader } from '../common/InvitationHeader';
import { MapSection } from '../common/MapSection';
import { PhotoGrid } from '../common/PhotoGrid';

const AnniversaryOfOneYear = () => {
  const images = [
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-1.png',
      alt: '채이 사진 1',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-1.png',
      alt: '채이 사진 2',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-1.png',
      alt: '채이 사진 3',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-1.png',
      alt: '채이 사진 4',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 첫 화면: 300vh 높이로 설정하여 컬러 변환 완료 후 지도 등장 */}
      <div className="h-[300vh] relative">
        {/* InvitationHeader를 sticky로 설정 */}
        <div className="sticky top-0 h-screen flex flex-col">
          <InvitationHeader
            title="엄채이의 첫 생일에 초대합니다"
            date="2025/08/23 오전 11시 30분"
          />
          <PhotoGrid images={images} className="flex-1" />
        </div>
      </div>

      {/* 카카오 맵 섹션 */}
      <div className="py-16">
        <MapSection />
      </div>
    </div>
  );
};

export { AnniversaryOfOneYear };
