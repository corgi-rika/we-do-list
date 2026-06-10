import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Card from "@/components/Card";
import Button from "@/components/Button";
import MutedText from "@/components/MutedText";
import type { TeamCodeCardProps } from "./type";

export default function TeamCodeCard({
  code,
  copied,
  onCopy,
  onRegenerate,
}: TeamCodeCardProps) {
  return (
    <div className="rounded-2xl bg-primary-light p-4 flex flex-col gap-3">
      <Card padding="sm">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold tracking-widest text-foreground">
            {code}
          </span>
          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              className="p-1 rounded-lg text-muted hover:bg-gray-100 transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </Card>
      <Button variant="secondary" fullWidth onClick={onCopy}>
        <span className="flex items-center justify-center gap-2">
          {copied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <DocumentDuplicateIcon className="w-4 h-4" />
          )}
          {copied ? "コピーしました" : "コードをコピー"}
        </span>
      </Button>
      <MutedText size="xs">このコードをメンバーに共有してください</MutedText>
    </div>
  );
}
