import type { ValidationMessageProps } from "./type";

export default function ValidationMessage({ message }: ValidationMessageProps) {
  return <p className="text-xs text-red-400">{message}</p>;
}
