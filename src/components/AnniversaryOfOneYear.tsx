'use client';

import { InvitationHeader } from './InvitationHeader';
import { MainPhotoSection } from './MainPhotoSection';
import { MapSection } from './MapSection';
import { PhotoGrid } from './PhotoGrid';

const AnniversaryOfOneYear = () => {
  const images = [
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_1.jpg',
      alt: '채이 사진 1',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_2.jpg',
      alt: '채이 사진 2',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_3.jpg',
      alt: '채이 사진 3',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_4.jpg',
      alt: '채이 사진 4',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_5.jpg',
      alt: '채이 사진 5',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_6.jpg',
      alt: '채이 사진 6',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_7.jpg',
      alt: '채이 사진 7',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_8.jpg',
      alt: '채이 사진 8',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_9.jpg',
      alt: '채이 사진 9',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_10.jpg',
      alt: '채이 사진 10',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_11.jpg',
      alt: '채이 사진 11',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_12.jpg',
      alt: '채이 사진 12',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_13.jpg',
      alt: '채이 사진 13',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_14.jpg',
      alt: '채이 사진 14',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_15.jpg',
      alt: '채이 사진 15',
    },
    {
      src: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_content_16.jpg',
      alt: '채이 사진 16',
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
