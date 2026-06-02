import type { IconButtonProps } from "./type";

export default function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-beige flex items-center justify-center shrink-0 cursor-pointer"
    >
      {children}
    </button>
  );
}
