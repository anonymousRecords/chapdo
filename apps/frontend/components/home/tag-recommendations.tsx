'use client';

import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { motion } from 'motion/react';
import { Post } from './blog-carousel';
import Link from 'next/link';

interface TagRecommendationsProps {
  posts: Post[];
  selectedTag?: string;
}

export default function TagRecommendations({
  posts,
  selectedTag = '개발',
}: TagRecommendationsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const filteredPosts = posts.filter((post) => post.tags.includes(selectedTag));

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // Added small threshold
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
    }
    return () => {
      window.removeEventListener('resize', checkScroll);
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <div className="relative overflow-hidden pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">최근에 올라온 따끈따끈한 글</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className={`p-2 rounded-full ${canScrollLeft ? 'bg-gray-100 hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!canScrollLeft}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-2 rounded-full ${canScrollRight ? 'bg-gray-100 hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!canScrollRight}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4"
        onScroll={checkScroll}
      >
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ y: -5 }}
            className="z-10 flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md"
          >
            <Link href={post.href} className="block h-full">
              <div className="h-40 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
