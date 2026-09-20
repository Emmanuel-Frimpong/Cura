import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "aria-label"> {
  "aria-label": string;
  icon?: React.ReactNode;
  shortcut?: string;
}

export const Input: React.FC<InputProps> = ({
  "aria-label": ariaLabel,
  icon,
  shortcut,
  className = "",
  placeholder = "Search anything...",
  ...props
}) => {
  return (
    <div className="relative flex items-center w-full max-w-md">
      {icon && (
        <span className="absolute left-[15px] text-[#676767] flex items-center pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type="text"
        aria-label={ariaLabel}
        placeholder={placeholder}
        className={`w-full h-[46px] bg-white border border-[#E0E0E0] rounded-[12px] text-[14px] text-[#232323] placeholder-[#A0A0A0] transition-colors focus:outline-none focus:border-[#232323] focus:ring-1 focus:ring-[#232323] ${
          icon ? "pl-[44px]" : "pl-[15px]"
        } ${shortcut ? "pr-[48px]" : "pr-[15px]"} ${className}`}
        {...props}
      />
      {shortcut && (
        <kbd className="absolute right-[12px] px-2 py-0.5 text-[11px] font-medium text-[#676767] bg-[#F0F0F0] border border-[#E0E0E0] rounded-[4px] pointer-events-none flex items-center gap-0.5">
          {shortcut}
        </kbd>
      )}
    </div>
  );
};

