'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  pageUrl: string;
};

export default function ExpandableDrawer({ isOpen, onClose, children, pageUrl }: DrawerProps) {
  let [drawerHeight, setDrawerHeight] = useState<number>(0);
  let [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  let drawerRef = useRef<HTMLDivElement>(null);
  let router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setDrawerHeight(window.innerHeight * 0.3); // 초기 높이는 화면의 30%
    }
  }, [isOpen]);

  useEffect(() => {
    let drawer = drawerRef.current;
    if (!drawer) return;

    let startY = 0;
    let currentY = 0;

    function handleTouchStart(e: TouchEvent) {
      startY = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      currentY = e.touches[0].clientY;
      let newHeight = window.innerHeight - currentY;
      setDrawerHeight(Math.max(newHeight, window.innerHeight * 0.3));
    }

    function handleTouchEnd() {
      if (drawerHeight > window.innerHeight * 0.6) {
        // Drawer가 화면의 60% 이상 열렸을 때 전체 화면으로 전환
        setIsTransitioning(true);
        setDrawerHeight(window.innerHeight);
        setTimeout(() => {
          router.push(pageUrl);
        }, 300); // 트랜지션 시간과 일치
      } else {
        // 그 외의 경우 초기 높이로 되돌리기
        setDrawerHeight(window.innerHeight * 0.3);
      }
    }

    drawer.addEventListener('touchstart', handleTouchStart);
    drawer.addEventListener('touchmove', handleTouchMove);
    drawer.addEventListener('touchend', handleTouchEnd);

    return () => {
      drawer.removeEventListener('touchstart', handleTouchStart);
      drawer.removeEventListener('touchmove', handleTouchMove);
      drawer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [drawerHeight, pageUrl, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div
        ref={drawerRef}
        style={{
          height: `${drawerHeight}px`,
          transition: isTransitioning ? 'all 0.3s ease-out' : 'none',
        }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="w-16 h-1 bg-gray-300 rounded mx-auto mb-4" />
          {children}
        </div>
      </div>
    </div>
  );
}
