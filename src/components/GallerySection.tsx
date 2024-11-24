import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const GalleryData = [
  {
    image: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-1.png',
    text: '처음 우리에게 온날',
  },
  {
    image:
      'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-2-hand.png',
    text: '처음 본 손',
  },
  {
    image: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-3.png',
    text: '처음',
  },
  {
    image:
      'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-4-foot.png',
    text: '처음 본 손',
  },
  {
    image: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-5.png',
    text: '처음',
  },
];

const GallerySection = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-60">
      <span>카드를 넘기면서 봐주세요.</span>
      <div className="relative h-270 w-200">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {GalleryData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="w-200 h-200">
                <img className="w-full h-full object-cover" src={data.image} />
              </div>
              <div className="h-50 flex items-end justify-end">
                <span>{data.text}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export { GallerySection };
