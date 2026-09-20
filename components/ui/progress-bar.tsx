import React from "react";

export interface ProgressBarProps {
  currentStep?: "cart" | "shipping" | "payment";
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep = "cart",
  className = "",
}) => {
  const steps = [
    { id: "cart", label: "Cart" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const getStepIndex = (stepId: string) => {
    return steps.findIndex((s) => s.id === stepId);
  };

  const activeIdx = getStepIndex(currentStep);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-1.5 w-full h-[6px] mb-2">
        {steps.map((step, idx) => {
          const isPastOrCurrent = idx <= activeIdx;
          return (
            <div
              key={step.id}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                isPastOrCurrent ? "bg-[#232323]" : "bg-[#E0E0E0]"
              }`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[12px] font-medium text-[#676767]">
        {steps.map((step, idx) => {
          const isCurrent = idx === activeIdx;
          return (
            <span
              key={step.id}
              aria-current={isCurrent ? "step" : undefined}
              className={isCurrent ? "font-bold text-[#232323]" : ""}
            >
              {step.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};
