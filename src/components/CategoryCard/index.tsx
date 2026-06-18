import { TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import Card from "@/components/Card";
import type { CategoryCardProps } from "./type";

export default function CategoryCard({
  name,
  onClick,
  onDelete,
}: CategoryCardProps) {
  return (
    <Card padding="md" onClick={onClick}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <TagIcon className="w-4 h-4 shrink-0 text-primary" />
          <span className="text-sm font-medium truncate">{name}</span>
        </div>
        {onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className="shrink-0 text-red-500 hover:text-red-700 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </Card>
  );
}
