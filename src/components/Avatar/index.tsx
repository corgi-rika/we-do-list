import type { AvatarProps } from "./type";

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "w-10 h-10",
  lg: "w-16 h-16",
};

const textClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "text-lg font-medium",
  lg: "text-3xl font-bold",
};

export default function Avatar({ name, size = "sm" }: AvatarProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-primary flex items-center justify-center`}
    >
      <span
        className={`${textClasses[size]} text-white`}
        style={{ pointerEvents: "none" }}
      >
        {name[0]}
      </span>
    </div>
  );
}
