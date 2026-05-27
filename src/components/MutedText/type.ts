import type { ReactNode } from "react";

export type MutedTextProps = {
  children?: ReactNode;
  text?: string;
  size?: "xs" | "sm";
  className?: string;
};
