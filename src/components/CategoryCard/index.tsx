import Card from "@/components/Card";
import type { CategoryCardProps } from "./type";

export default function CategoryCard({
  name,
  dotColor,
  onClick,
}: CategoryCardProps) {
  return (
    <Card padding="md" onClick={onClick}>
      <div className="flex items-center gap-2">
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            flexShrink: 0,
            backgroundColor: dotColor,
          }}
        />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </Card>
  );
}
