import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import MutedText from "@/components/MutedText";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      {/* ① アイコン・タイトル */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-3xl bg-primary-light flex items-center justify-center">
          <svg
            width="36"
            height="36"
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
        <h1 className="text-3xl font-bold text-foreground">We Do List</h1>
        <MutedText className="leading-relaxed">
          少人数グループでToDoを
          <br />
          共有・管理できるアプリ
        </MutedText>
      </div>

      {/* ② 機能カード */}
      <div className="flex flex-col gap-3 w-full">
        <FeatureCard
          icon={
            <svg
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6bba8f"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          title="グループを作成"
          description="家族や友人とグループを作成"
        />
        <FeatureCard
          icon={
            <svg
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6bba8f"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          }
          title="コードで参加"
          description="グループコードで簡単に参加"
        />
        <FeatureCard
          icon={
            <svg
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6bba8f"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          }
          title="家族やパートナーとToDo共有"
          description="やることを共有して見える化"
        />
      </div>

      {/* ③ ボタン */}
      <div className="flex flex-col gap-3 w-full">
        <Button variant="primary" fullWidth href="/signup">
          新規登録
        </Button>
        <Button variant="secondary" fullWidth href="/signin">
          ログイン
        </Button>
      </div>

      {/* ④ フッターテキスト */}
      <MutedText size="xs" className="leading-relaxed pb-4">
        家族、パートナー、友人とToDoを共有して
        <br />
        タスクを見える化しましょう
      </MutedText>
    </div>
  );
}
