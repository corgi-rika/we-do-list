import type { MutedTextProps } from "./type";

export default function MutedText({
  children,
  size = "sm",
  className,
}: MutedTextProps) {
  let classes = "text-muted";

  if (size === "xs") classes += " text-xs";
  if (size === "sm") classes += " text-sm";

  if (className) classes += " " + className;

  return <p className={classes}>{children}</p>;
}
