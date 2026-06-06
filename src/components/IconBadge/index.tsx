import type { IconBadgeProps } from "./type";

const sizeClasses = {
  md: "w-14 h-14",
  lg: "w-20 h-20",
};

const shapeClasses = {
  circle: "rounded-full",
  rounded: "rounded-3xl",
};

export default function IconBadge({
  children,
  size = "md",
  shape = "circle",
}: IconBadgeProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${shapeClasses[shape]} bg-primary-light shrink-0 flex items-center justify-center`}
    >
      {children}
    </div>
  );
}
