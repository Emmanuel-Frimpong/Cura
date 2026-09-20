import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "text";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 text-[14px] leading-tight select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#232323]";

  const variantStyles = {
    primary:
      "h-[44px] px-5 bg-[#232323] text-white rounded-[10px] hover:bg-[#454545] active:bg-[#000000] disabled:bg-[#454545]/70 disabled:text-white/60 disabled:cursor-not-allowed shadow-sm cursor-pointer",
    secondary:
      "h-[44px] px-5 bg-white text-[#232323] border border-[#E0E0E0] rounded-[10px] hover:bg-[#F8F8F8] hover:border-[#232323] active:bg-[#F0F0F0] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer",
    tertiary:
      "h-auto py-1 px-0 bg-transparent text-[#232323] font-semibold hover:underline active:opacity-70 disabled:text-[#A0A0A0] disabled:no-underline disabled:cursor-not-allowed cursor-pointer",
    text: "h-auto py-1 px-0 bg-transparent text-[#A0A0A0] hover:text-[#676767] active:text-[#232323] disabled:text-[#E0E0E0] disabled:cursor-not-allowed cursor-pointer",
  };

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
