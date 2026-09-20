"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./button";

export interface ProductCardProps {
  category?: string;
  title: string;
  price: string;
  imageUrl?: string;
  isWishlisted?: boolean;
  onAddToCart?: () => void;
  onWishlistToggle?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  category = "CURA",
  title,
  price,
  imageUrl,
  isWishlisted = false,
  onAddToCart,
  onWishlistToggle,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-[16px] border border-[#E0E0E0] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="relative w-full h-[180px] bg-[#F8F8F8] rounded-[12px] overflow-hidden mb-3 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-[#A0A0A0]">
            <svg
              className="w-12 h-12 stroke-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs mt-1">Product Image</span>
          </div>
        )}

        <button
          type="button"
          onClick={onWishlistToggle}
          aria-label={isWishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
          aria-pressed={isWishlisted}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#232323] hover:scale-105 transition-transform border border-[#E0E0E0]/60 shadow-xs cursor-pointer"
        >
          <svg
            className={`w-4 h-4 ${
              isWishlisted ? "fill-[#232323]" : "fill-none stroke-current stroke-2"
            }`}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="space-y-1 mb-4">
        <span className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider">
          {category}
        </span>
        <h4 className="text-[16px] font-bold text-[#232323] leading-snug">
          {title}
        </h4>
        <p className="text-[16px] font-semibold text-[#232323]">{price}</p>
      </div>

      <Button
        variant="primary"
        onClick={onAddToCart}
        className="w-full text-[13px] h-[40px]"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export interface CollectionCardProps {
  title: string;
  buttonText?: string;
  imageUrl?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  buttonText = "Explore Watches",
  imageUrl,
  href = "/shop?category=watches",
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`relative bg-[#232323] text-white rounded-[16px] p-6 flex flex-col justify-between min-h-[200px] overflow-hidden shadow-md ${className}`}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
      )}
      <div className="relative z-10 max-w-[60%]">
        <h3 className="font-heebo text-[28px] font-bold leading-tight mb-4">
          {title}
        </h3>
        {onClick ? (
          <Button
            variant="secondary"
            onClick={onClick}
            className="text-[13px] h-[38px] bg-[#F5E5D8] border-none text-[#232323] font-semibold hover:bg-[#E0C5B0]"
          >
            {buttonText}
          </Button>
        ) : (
          <Link href={href}>
            <Button
              variant="secondary"
              className="text-[13px] h-[38px] bg-[#F5E5D8] border-none text-[#232323] font-semibold hover:bg-[#E0C5B0]"
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export interface ReviewCardProps {
  reviewerName: string;
  rating?: number;
  comment: string;
  avatarUrl?: string;
  onMore?: () => void;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  rating = 5,
  comment,
  avatarUrl,
  onMore,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMoreClick = () => {
    if (onMore) {
      onMore();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`bg-white rounded-[16px] border border-[#E0E0E0] p-5 shadow-xs flex flex-col gap-3 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E0E0E0] overflow-hidden flex items-center justify-center text-[#676767]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={reviewerName}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1 text-[#232323]">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < rating ? "fill-[#232323]" : "fill-[#E0E0E0]"
                }`}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-[14px] font-bold text-[#232323] mt-0.5">
            {reviewerName}
          </p>
        </div>
      </div>
      <p className={`text-[13px] text-[#676767] leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}>
        {comment}
      </p>
      <button
        type="button"
        onClick={handleMoreClick}
        aria-expanded={isExpanded}
        className="text-[12px] font-semibold text-[#232323] underline self-start hover:text-[#676767] cursor-pointer"
      >
        {isExpanded ? "Less" : "More"}
      </button>
    </div>
  );
};

