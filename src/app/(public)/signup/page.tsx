import Link from "next/link";
import AuthHeader from "@/components/AuthHeader";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <AuthHeader subtitle="アカウントを作成" />

      {/* フォームカード */}
      <Card padding="lg" className="w-full flex flex-col gap-4">
        <Input label="ユーザー名" placeholder="山田太郎" />
        <Input
          label="メールアドレス"
          type="email"
          placeholder="example@email.com"
        />
        <Input label="パスワード" type="password" placeholder="••••••••" />
        <Input
          label="パスワード（確認）"
          type="password"
          placeholder="••••••••"
        />
        <Button variant="primary" fullWidth>
          登録する
        </Button>
        <p className="text-center text-sm text-muted">
          <Link href="/signin" className="text-primary font-medium">
            ログインはこちら
          </Link>
        </p>
      </Card>
    </div>
  );
}
