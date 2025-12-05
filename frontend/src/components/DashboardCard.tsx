import React from "react";

type Props = {
  icon?: React.ReactNode;
  title: string;
  value?: string | number;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
};

export default function DashboardCard({
  icon,
  title,
  value,
  subtitle,
  onClick,
  className = "",
}: Props) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => onClick && (e.key === "Enter" || e.key === " ") && onClick()}
      className={[
        "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow",
        "p-4 flex items-center gap-4 border border-gray-100",
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
    >
      {icon && (
        <div className="flex-shrink-0 text-2xl md:text-3xl text-indigo-600">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <div className="text-sm text-gray-500">{title}</div>
        {value !== undefined && (
          <div className="text-2xl md:text-3xl font-semibold text-gray-900">
            {value}
          </div>
        )}
        {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
      </div>
      {/* Accent bar */}
      <div className="w-1 h-10 bg-indigo-600 rounded-full opacity-80" />
    </div>
  );
}
