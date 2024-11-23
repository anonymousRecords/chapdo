'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import Chip from '../ui/chip/chip';
import Link from 'next/link';

export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  readingTime: number;
  tags: string[];
  publishDate: string;
  href: string;
}

interface BlogCarouselProps {
  posts: Post[];
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) =>
        prevIndex + newDirection < 0 ? posts.length - 1 : (prevIndex + newDirection) % posts.length,
      );
    },
    [posts.length],
  );

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        paginate(1);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isPaused, paginate]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
            setIsPaused(false);
          }}
          className="absolute w-full h-full"
        >
          <Link href={posts[currentIndex].href}>
            <img
              src={posts[currentIndex].image}
              alt={posts[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h2 className="text-2xl font-bold mb-2">{posts[currentIndex].title}</h2>
              <p className="text-sm opacity-90">{posts[currentIndex].description}</p>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      <button
        className="z-30 absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
        onClick={() => paginate(-1)}
      >
        <ArrowLeftIcon className="w-6 h-6 text-white" />
      </button>

      <button
        className="z-30 absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
        onClick={() => paginate(1)}
      >
        <ArrowRightIcon className="w-6 h-6 text-white" />
      </button>

      <div className="absolute top-4 right-4 z-10">
        <Chip label={`${currentIndex + 1} / ${posts.length}`} deletable={false} />
      </div>
    </div>
  );
}
