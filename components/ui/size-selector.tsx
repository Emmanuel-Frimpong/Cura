"use client";

import React, { useState } from "react";

export interface SizeSelectorProps {
  sizes?: string[];
  selectedSize?: string;
  onChange?: (size: string) => void;
  className?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes = ["S", "M", "L", "XL", "XXL"],
  selectedSize: externalSelected,
  onChange,
  className = "",
}) => {
  const [internalSelected, setInternalSelected] = useState<string>("S");
  const currentSelected = externalSelected ?? internalSelected;

  const handleSelect = (size: string) => {
    setInternalSelected(size);
    onChange?.(size);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {sizes.map((size) => {
        const isSelected = currentSelected === size;
        return (
          <button
            key={size}
            type="button"
            aria-pressed={isSelected}
            aria-label={`Select size ${size}`}
            onClick={() => handleSelect(size)}
            className={`min-w-[42px] h-[42px] px-3 rounded-[8px] text-[14px] font-semibold transition-all flex items-center justify-center select-none cursor-pointer ${
              isSelected
                ? "bg-[#232323] text-white shadow-xs"
                : "bg-white text-[#232323] border border-[#E0E0E0] hover:border-[#232323]"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};
