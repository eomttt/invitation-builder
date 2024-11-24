import { ReactNode, useEffect, useRef, useState } from 'react';

const CARD_HEIGHT = 300;

interface CardSectionsProps {
  defaultOffsetTop: number;
  title: Array<ReactNode>;
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
        <div className="relative text-black px-20">
          <span
            className="text-title absolute -top-120"
            style={{
              opacity: Math.min(scrollPercentage, 20) / 20,
              transform: `translateY(${-50 + (Math.min(scrollPercentage, 20) * 50) / 20}%)`,
              transition: 'transform opacity',
            }}
          >
            {title[0]}
          </span>
          <span
            className="text-title absolute -top-80"
            style={{
              opacity: Math.min(scrollPercentage - 20, 40) / 40,
              transform: `translateY(${-50 + (Math.min(Math.max(scrollPercentage - 20, 0), 40) * 50) / 40}%)`,
              transition: 'transform opacity',
            }}
          >
            {title[1]}
          </span>
          <span
            className="text-title absolute -top-40"
            style={{
              opacity: Math.min(scrollPercentage - 40, 80) / 80,
              transform: `translateY(${-50 + (Math.min(Math.max(scrollPercentage - 40, 0), 80) * 50) / 80}%)`,
              transition: 'transform opacity',
            }}
          >
            {title[2]}
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
