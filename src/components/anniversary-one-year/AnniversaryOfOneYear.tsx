'use client';

import { InvitationHeader } from '../common/InvitationHeader';
import { MainPhotoSection } from '../common/MainPhotoSection';
import { MapSection } from '../common/MapSection';
import { PhotoGrid } from '../common/PhotoGrid';

const AnniversaryOfOneYear = () => {
  const images = [
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_5.jpg',
      alt: '채이 사진 1',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_2.jpg',
      alt: '채이 사진 2',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitateion_3.jpg',
      alt: '채이 사진 3',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_4.JPG',
      alt: '채이 사진 4',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* InvitationHeader - 일반 스크롤 */}
      <div className="mb-8 md:mb-12">
        <InvitationHeader
          title="엄채이의 첫 생일에 초대합니다"
          date="2025/08/23 오전 11시 30분"
        />
      </div>

      {/* MainPhotoSection - 사진만 sticky */}
      <div className="h-[400vh] relative">
        <div className="sticky top-0 h-screen">
          <MainPhotoSection />
        </div>
      </div>

      {/* PhotoGrid - 전체 화면 스크롤 애니메이션 */}
      <div className="h-[300vh] relative">
        <div className="sticky top-0 h-screen">
          <PhotoGrid images={images} className="h-full" />
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
