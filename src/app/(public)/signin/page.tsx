import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import MutedText from "@/components/MutedText";

export default function SigninPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* ヘッダー */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center">
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
        <MutedText>おかえりなさい</MutedText>
      </div>

      {/* フォームカード */}
      <Card padding="lg" className="w-full flex flex-col gap-4">
        <Input
          label="メールアドレス"
          type="email"
          placeholder="example@email.com"
        />
        <Input label="パスワード" type="password" placeholder="••••••••" />
        <Button variant="primary" fullWidth>
          ログイン
        </Button>
        <p className="text-center text-sm text-muted">
          <Link href="/forgot-password" className="text-muted underline">
            パスワードをお忘れの方はこちら
          </Link>
        </p>
        <p className="text-center text-sm text-muted">
          <Link href="/signup" className="text-primary font-medium">
            新規登録はこちら
          </Link>
        </p>
      </Card>
    </div>
  );
}
