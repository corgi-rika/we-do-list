import type { CSSProperties, ReactNode } from "react";

export type IconButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
};
