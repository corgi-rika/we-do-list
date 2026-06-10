export type TeamCodeCardProps = {
  code: string;
  copied: boolean;
  onCopy: () => void;
  onRegenerate?: () => void;
};
