import { HoloCard } from 'react-holo-card-effect';

const MainCard = () => {
  return (
    <HoloCard
      url={
        'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2024-11-24+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+1.24.40.png'
      }
      height={450} // optional, default 446
      width={300} // optional, default 320
      showSparkles={false} // optional, default true
    />
  );
};

export { MainCard };
