import type { ValidationMessageProps } from "./type";

export default function ValidationMessage({
  message,
  center,
}: ValidationMessageProps) {
  return (
    <p className={`text-xs text-red-400${center ? " text-center" : ""}`}>
      {message}
    </p>
  );
}
