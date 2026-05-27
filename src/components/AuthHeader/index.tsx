import MutedText from "@/components/MutedText";
import type { AuthHeaderProps } from "./type";

export default function AuthHeader({ subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center">
        {/* TODO: アイコン決まり次第差し替え予定 */}
        <svg
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6bba8f"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-foreground">We Do List</h1>
      <MutedText text={subtitle} />
    </div>
  );
}
