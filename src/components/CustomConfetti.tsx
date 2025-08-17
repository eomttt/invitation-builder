'use client';

import React from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';


declare global {
  interface Window {
    confetti: any;
  }
}

interface CustomConfettiProps {
  onFire?: () => void;
}

interface CustomConfettiRef {
  fire: () => void;
}

const CustomConfetti = React.forwardRef<CustomConfettiRef, CustomConfettiProps>(
  ({ onFire }, ref) => {
    const fire = () => {
      if (window.confetti) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          
          // 이미지를 사용한 confetti 발사
          window.confetti({
            particleCount: 30,
            spread: 120,
            origin: { y: 0.6 },
            shapes: [canvas]
          });
        };
        img.src = '/confetti.png';
      }
      onFire?.();
    };

    React.useImperativeHandle(ref, () => ({
      fire,
    }));

    return <ReactCanvasConfetti onInit={({ confetti }) => {
      window.confetti = confetti;
    }} />;
  }
);

CustomConfetti.displayName = 'CustomConfetti';

export default CustomConfetti;