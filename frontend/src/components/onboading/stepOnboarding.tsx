import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string;
  label: string;
}

interface StepOnboardingProps {
  label: string;
  active: boolean;
  completed?: boolean;
  isLast?: boolean;
  onClick?: () => void;
}

export const ActiveStepIcon: React.FC = () => (
  <div className="relative w-6 h-6 rounded-full border-2 border-primary-jefly flex items-center justify-center shrink-0">
    <span className="w-2 h-2 rounded-full bg-secondary-jefly z-10" />
  </div>
);

export const CompletedStepIcon: React.FC = () => (
  <div className="w-6 h-6 rounded-full bg-primary-jefly flex items-center justify-center shrink-0 shadow-xs">
    <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
  </div>
);

export const InactiveStepIcon: React.FC = () => (
  <div className="w-6 h-6 rounded-full border-2 border-[#E5E5E5] bg-transparent shrink-0" />
);

const StepOnboarding: React.FC<StepOnboardingProps> = ({
  label,
  active,
  completed = false,
  isLast = false,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-start w-full">
      <div
        onClick={onClick}
        className={`w-full flex items-center gap-3.5 transition-all duration-150 ${
          active
            ? 'bg-white rounded-2xl py-2.5 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-neutral-100'
            : 'py-1.5 px-4'
        } ${completed && onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      >
        <div className="flex items-center justify-center shrink-0">
          {active ? (
            <ActiveStepIcon />
          ) : completed ? (
            <CompletedStepIcon />
          ) : (
            <InactiveStepIcon />
          )}
        </div>

        <span
          className={`text-sm tracking-tight transition-colors font-inter ${
            active
              ? 'font-bold text-neutral-900'
              : completed
                ? 'font-medium text-neutral-800'
                : 'font-normal text-[#737373]'
          }`}
        >
          {label}
        </span>
      </div>

      {!isLast && (
        <div className="pl-6.75 py-0.5">
          <div className="w-[1.5px] h-2.5 bg-[#E5E5E5]" />
        </div>
      )}
    </div>
  );
};

export default StepOnboarding;
