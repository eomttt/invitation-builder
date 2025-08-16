interface InvitationHeaderProps {
  title: string;
  date: string;
  className?: string;
}

const InvitationHeader = ({
  title,
  date,
  className = '',
}: InvitationHeaderProps) => {
  return (
    <div
      className={`flex-shrink-0 flex flex-col justify-center text-center px-4 py-8 md:py-12 ${className}`}
    >
      <h1
        className="font-bold text-gray-800 mb-6 md:mb-8 leading-tight font-single-day"
        style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 5rem)',
          lineHeight: '1.1',
        }}
      >
        {title}
      </h1>
      <div className="space-y-3 md:space-y-4 font-nanum-myeongjo">
        <p
          className="font-semibold text-gray-600"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
        >
          {date}
        </p>
      </div>
    </div>
  );
};

export { InvitationHeader };
