import Card from "@/components/Card";
import type { CategoryCardProps } from "./type";

export default function CategoryCard({ name, dotColor, onClick }: CategoryCardProps) {
  return (
    <Card padding="md" onClick={onClick}>
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
        />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </Card>
  );
}
