"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface DraggablePeelableStickerProps {
  image: string;
  size?: number;
}

const DraggablePeelableSticker = ({
  image,
  size = 250,
}: DraggablePeelableStickerProps) => {
  const [isPeeled, setIsPeeled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const peel = useMotionValue(0);

  const rotate = useTransform(peel, [0, 1], [0, -15]);
  const scale = useTransform(peel, [0, 1], [1, 1.1]);
  const shadowOpacity = useTransform(peel, [0, 1], [0, 0.2]);

  const handlePeel = () => {
    if (!isDragging) {
      setIsPeeled(!isPeeled);
      peel.set(isPeeled ? 0 : 1);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsPeeled(true);
    peel.set(1);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      className="absolute cursor-move"
      style={{ width: size, height: size }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.1, zIndex: 10 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotate,
          scale,
          transformOrigin: "bottom right",
        }}
        onClick={handlePeel}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <img
          src={image}
          alt="Sticker"
          className="w-full h-full object-cover pointer-events-none"
        />
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: shadowOpacity }}
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-white pointer-events-none"
        style={{
          clipPath: `url(#stickerClipPath)`,
        }}
      />
      <svg width="0" height="0">
        <defs>
          <clipPath id="stickerClipPath">
            <image href={image} width={size} height={size} />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export default function Stickers() {
  const stickers = [
    { id: 1, image: "/sticker/perfectdays.jpg" },
    { id: 2, image: "/sticker/perfect.jpg" },
  ];

  return (
    <div className="relative w-full h-screen bg-gray-200 overflow-hidden">
      {stickers.map((sticker) => (
        <DraggablePeelableSticker
          key={sticker.id}
          image={sticker.image}
          size={250}
        />
      ))}
    </div>
  );
}
