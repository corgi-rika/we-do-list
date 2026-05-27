import Link from "next/link";
import type { ButtonProps } from "./type";

export default function Button({
  variant = "primary",
  size = "lg",
  fullWidth = false,
  children,
  onClick,
  disabled,
  type = "button",
  href,
  className: extraClassName,
}: ButtonProps) {
  // 全バリアント共通のクラス
  let className = "inline-flex items-center justify-center rounded-2xl transition-opacity disabled:opacity-50 disabled:cursor-not-allowed";

  // 色（variant によって変わる）
  if (variant === "primary")     className += " bg-primary text-white hover:opacity-90";
  if (variant === "secondary")   className += " bg-beige text-foreground hover:opacity-90";
  if (variant === "destructive") className += " bg-red-400 text-white hover:opacity-90";
  if (variant === "ghost")       className += " bg-transparent text-primary hover:bg-primary-light";

  // 大きさ（size によって変わる）
  if (size === "sm") className += " py-2 px-4 text-sm";
  if (size === "md") className += " py-3 px-5 text-sm font-semibold";
  if (size === "lg") className += " py-4 px-6 text-base font-semibold";

  // 横幅いっぱいにするか
  if (fullWidth) className += " w-full";

  // 外から追加クラスが渡された場合
  if (extraClassName) className += " " + extraClassName;

  // href があればリンク、なければボタン
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

