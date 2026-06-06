import Card from "@/components/Card";
import MutedText from "@/components/MutedText";
import IconBadge from "@/components/IconBadge";
import type { FeatureCardProps } from "./type";

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card padding="md" className="flex items-center gap-4 text-left">
      <IconBadge size="md" shape="circle">
        {icon}
      </IconBadge>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        {description && <MutedText className="mt-0.5">{description}</MutedText>}
      </div>
    </Card>
  );
}
