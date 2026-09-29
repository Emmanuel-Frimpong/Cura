"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

export interface CuraImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  alt: string;
}

export const CuraImage: React.FC<CuraImageProps> = ({
  src,
  alt,
  className = "",
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src || src.trim() === "") {
    return (
      <div className={`relative w-full h-full min-h-[120px] flex flex-col items-center justify-center bg-[#1A1A1A] text-white p-4 text-center select-none ${className}`}>
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2 shadow-inner">
          <span className="font-oswald text-[16px] font-extrabold tracking-tighter text-white">
            CURA<span className="text-[#9E784F]">.</span>
          </span>
        </div>
        <span className="font-oswald text-[11px] font-bold tracking-widest text-[#9E784F] uppercase">
          ATELIER OBJECT
        </span>
        <span className="text-[9px] text-[#888] font-mono mt-0.5 uppercase tracking-wider">
          CURA ARCHIVE
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  target.onerror = null; // Prevent infinite loop
  target.src = "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg";
}
