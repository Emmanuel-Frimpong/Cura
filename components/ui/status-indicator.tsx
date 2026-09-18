import React from "react";

export type StatusType = "processing" | "shipped" | "delivered" | "returned";

export interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  className = "",
}) => {
  const configs: Record<
    StatusType,
    { label: string; bg: string; text: string; iconBg: string; icon: React.ReactNode }
  > = {
    processing: {
      label: "Processing",
      bg: "bg-[#F0F0F0]",
      text: "text-[#232323]",
      iconBg: "bg-[#232323] text-white",
      icon: (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    shipped: {
      label: "Shipped",
      bg: "bg-[#F5E5D8]",
      text: "text-[#232323]",
      iconBg: "bg-[#D4B7A0] text-[#232323]",
      icon: (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    delivered: {
      label: "Delivered",
      bg: "bg-[#E8F5E9]",
      text: "text-[#1B5E20]",
      iconBg: "bg-[#2E7D32] text-white",
      icon: (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    returned: {
      label: "Returned",
      bg: "bg-[#FBE9E7]",
      text: "text-[#C62828]",
      iconBg: "bg-[#D84315] text-white",
      icon: (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
  };

  const config = configs[status];
  const displayLabel = label || config.label;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold ${config.bg} ${config.text} ${className}`}
    >
      <span className={`w-4 h-4 rounded-full flex items-center justify-center ${config.iconBg}`}>
        {config.icon}
      </span>
      <span>{displayLabel}</span>
    </div>
  );
};
