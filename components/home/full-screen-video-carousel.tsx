"use client";
import React, { useState, useEffect, useRef } from "react";
import { VIDEO_ELEMENTS } from "@/constants";

interface VideoElement {
  id: string;
  description: string;
  video_url: string;
}

export default function FullscreenVideoCarousel() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<Array<React.RefObject<HTMLVideoElement>>>(
    VIDEO_ELEMENTS.map(() => React.createRef<HTMLVideoElement>()),
  );

  useEffect(() => {
    const playCurrentVideo = () => {
      const currentVideoRef = videoRefs.current[currentVideoIndex];
      if (currentVideoRef.current) {
        currentVideoRef.current
          .play()
          .catch((error) => console.error("Video play failed:", error));
      }
    };

    playCurrentVideo();

    return () => {
      const currentVideoRef = videoRefs.current[currentVideoIndex];
      if (currentVideoRef.current) {
        currentVideoRef.current.pause();
      }
    };
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % VIDEO_ELEMENTS.length,
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {VIDEO_ELEMENTS.map((video: VideoElement, index: number) => (
        <video
          key={video.id}
          ref={videoRefs.current[index]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentVideoIndex ? "opacity-100" : "opacity-0"
          }`}
          src={video.video_url}
          muted
          playsInline
          loop
          onEnded={handleVideoEnd}
        />
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {VIDEO_ELEMENTS.map((_, index: number) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentVideoIndex ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
