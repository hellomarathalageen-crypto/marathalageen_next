import { CheckCircle2 } from "lucide-react";

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function VerifiedBadge({ size = "md", showLabel = false }: VerifiedBadgeProps) {
  const sizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };
  return (
    <span className="inline-flex items-center gap-1">
      <CheckCircle2 className={`${sizes[size]} text-[#DB1866] shrink-0`} />
      {showLabel && <span className="text-xs font-semibold text-[#DB1866]">Verified</span>}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  change?: string;
  positive?: boolean;
  icon?: React.ReactNode;
  accentColor?: string;
}

export function StatCard({
  label,
  value,
  subLabel,
  change,
  positive = true,
  icon,
  accentColor = "#DB1866",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
        {icon && (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}15` }}>
            <span style={{ color: accentColor }}>{icon}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-black text-[#2A3773] mb-1">{value}</p>
      {(change || subLabel) && (
        <p className={`text-xs font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
          {change && <span>{positive ? "↑" : "↓"} {change} </span>}
          {subLabel && <span className="text-gray-400 font-normal">{subLabel}</span>}
        </p>
      )}
    </div>
  );
}

interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center gap-0 w-full overflow-x-auto">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <div key={step} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  isCompleted
                    ? "bg-[#DB1866] border-[#DB1866] text-white"
                    : isActive
                    ? "bg-white border-[#DB1866] text-[#DB1866]"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <p
                className={`text-[10px] font-semibold text-center leading-tight max-w-[60px] ${
                  isActive ? "text-[#DB1866]" : isCompleted ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1 transition-all ${
                  isCompleted ? "bg-[#DB1866]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface MatchPercentProps {
  percent: number;
  size?: number;
}

export function MatchPercent({ percent, size = 72 }: MatchPercentProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFE4EF"
          strokeWidth={6}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#DB1866"
          strokeWidth={6}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute">
        <p className="text-base font-black text-[#DB1866] leading-none text-center" style={{ marginTop: -size / 2 - 6 }}>
          {percent}%
        </p>
      </div>
    </div>
  );
}
