import Card from "@/components/Card";
import MutedText from "@/components/MutedText";
import type { FeatureCardProps } from "./type";

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card padding="md" className="flex items-center gap-4 text-left">
      <div className="w-12 h-12 rounded-full bg-primary-light shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <MutedText className="mt-0.5">{description}</MutedText>
      </div>
    </Card>
  );
}
