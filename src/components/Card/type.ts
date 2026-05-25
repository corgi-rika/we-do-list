import type { ReactNode } from "react";

export type CardPadding = "sm" | "md" | "lg";

export type CardProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  padding?: CardPadding;
};
