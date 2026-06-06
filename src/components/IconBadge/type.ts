import type { ReactNode } from "react";

export type IconBadgeSize = "md" | "lg";
export type IconBadgeShape = "circle" | "rounded";

export type IconBadgeProps = {
  children: ReactNode;
  size?: IconBadgeSize;
  shape?: IconBadgeShape;
};
