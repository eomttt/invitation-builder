import { CountDown } from '../common/CountDown';

const MainSectionOneHundred = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-120 p-10 text-title">
        <span>채이의</span>
        <br />
        <span>첫 백일</span>
      </div>
      <img
        className="w-screen grow object-contain"
        src="https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-1.png"
      />
      <div className="h-100 p-10">
        <span>태어난지</span>
        <br />
        <CountDown />
      </div>
    </div>
  );
};

export { MainSectionOneHundred };
