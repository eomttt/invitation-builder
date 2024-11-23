const CountDown = ({
  maxCount = 10,
  counter,
}: {
  maxCount?: number;
  counter: number;
}) => {
  return (
    <ul className="card-list">
      {Array.from({ length: maxCount }).map((_, index) => (
        <li
          key={index}
          className={
            index === counter
              ? 'front'
              : counter - 1 < 0
                ? index === 0
                  ? ''
                  : 'back'
                : index === (counter - 1) % maxCount
                  ? 'back'
                  : ''
          }
        >
          <div className="upper">
            <div className="num">{index}</div>
          </div>
          <div className="lower">
            <div className="num">{index}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { CountDown };
