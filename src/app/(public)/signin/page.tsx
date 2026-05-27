import Link from "next/link";
import AuthHeader from "@/components/AuthHeader";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";

export default function SigninPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <AuthHeader subtitle="おかえりなさい" />

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
