import Image from 'next/image';

import { CountDown } from '../common/CountDown';

const MainSectionOneYear = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-120 p-10 text-title">
        <span>채이의</span>
        <br />
        <span>첫 돌잔치</span>
      </div>
      <Image
        className="w-screen grow object-contain"
        src="https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-1.png"
        alt="채이의 첫 돌잔치 이미지"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="h-100 p-10">
        <CountDown />
      </div>
    </div>
  );
};

export { MainSectionOneYear };
