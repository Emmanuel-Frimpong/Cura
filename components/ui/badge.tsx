import React from "react";

export interface BadgeProps {
  variant?: "sale" | "new" | "popular" | "outline";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "sale",
  children,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-[6px] text-[12px] font-bold tracking-wide uppercase";

  const variantStyles = {
    sale: "bg-[#000000] text-white",
    new: "bg-[#F5E5D8] text-[#232323]",
    popular: "bg-[#D4B7A0] text-[#232323]",
    outline: "bg-transparent border border-[#E0E0E0] text-[#676767]",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
