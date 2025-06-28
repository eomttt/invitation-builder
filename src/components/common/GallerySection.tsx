'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

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
    text: '처음 본 발',
  },
  {
    image: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/born-5.png',
    text: '처음',
  },
];

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handlePrevious = () => {
    setSelectedIndex(prev => (prev === 0 ? GalleryData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev === GalleryData.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-30 mb-60">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 max-w-6xl mx-auto w-full">
        {GalleryData.map((data, index) => (
          <Dialog
            key={index}
            open={isDialogOpen && selectedIndex === index}
            onOpenChange={setIsDialogOpen}
          >
            <DialogTrigger asChild>
              <div
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 aspect-square"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={data.image}
                  alt={data.text}
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white text-sm font-medium">
                    {data.text}
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0">
              <div className="relative">
                <Image
                  className="w-full h-auto max-h-[80vh] object-contain"
                  src={GalleryData[selectedIndex].image}
                  alt={GalleryData[selectedIndex].text}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white text-lg font-medium">
                    {GalleryData[selectedIndex].text}
                  </span>
                </div>

                {/* 좌측 화살표 */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* 우측 화살표 */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export { GallerySection };
