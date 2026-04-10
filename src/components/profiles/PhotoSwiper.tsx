"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PhotoSwiperProps {
  photos: string[];
  name: string;
}

export default function PhotoSwiper({ photos, name }: PhotoSwiperProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
      {/* Photos */}
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {photos.map((photo, i) => (
          <div key={i} className="relative flex-shrink-0 w-full h-full">
            <Image
              src={photo}
              alt={`${name} ${i + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Tap zones */}
      <button
        className="absolute left-0 top-0 w-1/2 h-full z-10"
        onClick={() => setCurrent((c) => Math.max(0, c - 1))}
        aria-label="이전 사진"
      />
      <button
        className="absolute right-0 top-0 w-1/2 h-full z-10"
        onClick={() => setCurrent((c) => Math.min(photos.length - 1, c + 1))}
        aria-label="다음 사진"
      />

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "rounded-full transition-all duration-200",
              i === current
                ? "w-5 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/50"
            )}
          />
        ))}
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
