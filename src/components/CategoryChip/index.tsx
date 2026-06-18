"use client";

import { TagIcon } from "@heroicons/react/24/outline";
import type { CategoryChipProps } from "./type";

export default function CategoryChip({
  name,
  selected,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
        selected ? "border-primary bg-primary-light" : "border-gray-300"
      }`}
    >
      <TagIcon className="w-3.5 h-3.5 shrink-0 text-primary" />
      {name}
    </button>
  );
}
