import type { MutedTextProps } from "./type";

export default function MutedText({
  children,
  size = "sm",
  className,
  text,
}: MutedTextProps) {
  let classes = "text-muted";

  if (size === "xs") classes += " text-xs";
  if (size === "sm") classes += " text-sm";

  if (className) classes += " " + className;

  return <p className={classes}>{text ?? children}</p>;
}
