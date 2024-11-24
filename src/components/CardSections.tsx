import { ReactNode, useEffect, useRef, useState } from 'react';

const CARD_HEIGHT = 300;

interface CardSectionsProps {
  defaultOffsetTop: number;
  title?: ReactNode;
  section: number;
  scrollY: number;
  dir: 'right' | 'left';
  cards: Array<string>;
}
const CardSections = ({
  defaultOffsetTop,
  title,
  section,
  scrollY,
  dir,
  cards,
}: CardSectionsProps) => {
  const [height, setHeight] = useState(0);

  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  const containerGap = height / 2;
  const cardContainerTopOffset = height / 2 - CARD_HEIGHT / 2;

  const startPosition =
    defaultOffsetTop +
    (height + containerGap) * section -
    cardContainerTopOffset;
  const endPosition = startPosition + height - CARD_HEIGHT;

  const start = Math.max(startPosition, 0);
  const end = endPosition;

  const scrollPercentage =
    Math.min(Math.max((scrollY - start) / (end - start), 0), 1) * 100;

  const translateValue =
    dir === 'right' ? 20 - scrollPercentage : -80 + scrollPercentage;
  const transform = `translateX(${translateValue}%)`;

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <div
      style={{
        height: `${height}px`,
      }}
      ref={cardContainerRef}
    >
      <div
        className="sticky "
        style={{
          top: `${cardContainerTopOffset}px`,
        }}
      >
        <div className="relative">
          <span
            className="text-title absolute -top-40 left-20 text-black"
            style={{
              opacity: Math.min(scrollPercentage, 50) / 50,
              transform: `translateY(${-30 + (Math.min(scrollPercentage, 50) * 30) / 50}%)`,
              transition: 'transform opacity',
            }}
          >
            {title}
          </span>
          <div
            className="flex gap-10 w-card-container h-card-h"
            style={{
              transform: transform,
              transition: 'transform',
            }}
          >
            {cards.map((card, index) => (
              <div key={index} className="bg-white w-card-w h-full shrink-0">
                <img src={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardSections };
