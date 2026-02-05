'use client'
interface StatBarProps {
  label: string;
  value: number; // nilai asli (misal 65)
  max?: number;  // default 100
  color?: string;
}

export default function StatBar({
  label,
  value,
  max = 100,
  color = "bg-[#3D3D8A]",
}: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      {/* label */}
      <span className="w-20 text-[10px] max-sm:text-[10px] font-semibold text-gray-700">
        {label}
      </span>

      {/* bar */}
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* percent */}
      <span className="w-12 text-sm font-medium text-gray-700 text-right">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}
