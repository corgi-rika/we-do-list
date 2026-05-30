import type { CardProps } from "./type";

export default function Card({
  children,
  onClick,
  className = "",
  padding = "md",
}: CardProps) {
  // ベースのクラス
  let baseClass = "bg-white rounded-2xl border border-gray-100 shadow-sm";

  // 余白（padding によって変わる）
  if (padding === "sm") baseClass += " p-3";
  if (padding === "md") baseClass += " p-4";
  if (padding === "lg") baseClass += " p-5";

  // 外から追加のクラスが渡された場合
  if (className) baseClass += ` ${className}`;

  // onClick があればタップできるカード、なければ普通のカード
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClass} w-full text-left cursor-pointer hover:-translate-y-1 hover:shadow-md active:opacity-75 transition-all`}
      >
        {children}
      </button>
    );
  }

  return <div className={baseClass}>{children}</div>;
}
