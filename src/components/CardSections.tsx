import { useRef } from 'react';

const CARD_HEIGHT = 300;

interface CardSectionsProps {
  titleHeight: number;
  section: number;
  scrollY: number;
  dir: 'right' | 'left';
  cards: Array<string>;
}
const CardSections = ({
  titleHeight,
  section,
  scrollY,
  dir,
  cards,
}: CardSectionsProps) => {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  const height = window.innerHeight;
  const containerGap = height / 2;
  const cardContainerTopOffset = height / 2 - CARD_HEIGHT / 2;

  const startPosition =
    titleHeight + (height + containerGap) * section - cardContainerTopOffset;
  const endPosition = startPosition + height - CARD_HEIGHT;

  const start = Math.max(startPosition, 0);
  const end = endPosition;

  const scrollPercentage =
    Math.min(Math.max((scrollY - start) / (end - start), 0), 1) * 100;

  const translateValue =
    dir === 'right' ? 20 - scrollPercentage : -80 + scrollPercentage;
  const transform = `translateX(${translateValue}%)`;

  return (
    <div
      style={{
        height: `${height}px`,
      }}
      ref={cardContainerRef}
    >
      <div
        className="flex gap-10 sticky w-card-container h-card-h"
        style={{
          top: `${cardContainerTopOffset}px`,
          transform: transform,
        }}
      >
        {cards.map((card, index) => (
          <div key={index} className="bg-white w-card-w h-full shrink-0">
            {`사진 ${index}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export { CardSections };
