import type { AchievementCardProps } from "./type";
import Card from "@/components/Card";

export default function AchievementCard({
  groupName,
  done,
  total,
}: AchievementCardProps) {
  const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="mx-4 mt-4 p-4 rounded-2xl bg-primary-light">
      <p className="text-sm font-semibold text-foreground mb-3">{groupName}</p>
      <Card padding="md">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">達成率</span>
            <span className="text-lg font-bold text-primary">
              {percentage}%
            </span>
          </div>
          {/* 進捗バー */}
          <div className="w-full h-2 bg-beige rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-muted text-right">
            {done} / {total} 完了
          </p>
        </div>
      </Card>
    </div>
  );
}
