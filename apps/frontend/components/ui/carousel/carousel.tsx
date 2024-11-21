'use client'

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import Chip from '../chip/chip';

const IMAGES = [
  { id: 1, src: '/images/image_1.jpeg', alt: 'Image 1' },
  { id: 2, src: '/images/image_2.jpeg', alt: 'Image 2' },
  { id: 3, src: '/images/image_3.jpeg', alt: 'Image 3' },
];

export default function Carousel () {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    ({ movement: [mx], last, active, cancel }) => {
      cancel();
    },
    {
      axis: 'x',
      filterTaps: true,
    },
  );

  useEffect(() => {
    if (!isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((current) => (current === IMAGES.length - 1 ? 0 : current + 1));
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isDragging]);

  useEffect(() => {
    api.start({ x: -currentIndex * 100 });
  }, [currentIndex, api]);

  return (
    <div className="relative w-full aspect-square overflow-hidden">
      <animated.div
        {...bind()}
        style={{
          display: 'flex',
          width: `${IMAGES.length * 100}%`,
          transform: x.to((x) => `translateX(${x}%)`),
        }}
        className="h-full touch-none"
      >
        {IMAGES.map((image) => (
          <div key={image.id} className="relative w-full aspect-square flex-shrink-0">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        ))}
      </animated.div>

      <div className="absolute top-4 right-4">
        <Chip label={`${currentIndex + 1}/${IMAGES.length}`} deletable={false} />
      </div>
    </div>
  );
};
