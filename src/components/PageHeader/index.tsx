import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { PageHeaderProps } from "./type";

export default function PageHeader({
  title,
  onBack,
  rightAction,
}: PageHeaderProps) {
  const sideClass = "w-12 h-12 shrink-0";

  return (
    <div className="flex items-center justify-between">
      {onBack ? (
        <button
          onClick={onBack}
          className={`${sideClass} rounded-full bg-beige flex items-center justify-center cursor-pointer`}
        >
          <ArrowLeftIcon className="w-6 h-6 text-foreground" />
        </button>
      ) : (
        <div className={sideClass} />
      )}

      <h1 className="flex-1 text-center text-lg font-bold">{title}</h1>

      {rightAction ? (
        <div className={sideClass}>{rightAction}</div>
      ) : (
        <div className={sideClass} />
      )}
    </div>
  );
}
