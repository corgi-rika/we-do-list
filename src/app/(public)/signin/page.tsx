"use client";

import Link from "next/link";
import { useSignin } from "@/hooks/useSignin";
import AuthHeader from "@/components/AuthHeader";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";

export default function SigninPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useSignin();

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <AuthHeader subtitle="おかえりなさい" />

      <Card padding="lg" className="w-full flex flex-col gap-4">
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <Input
          label="メールアドレス"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={setEmail}
        />
        <Input
          label="パスワード"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
        />
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "ログイン中..." : "ログイン"}
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
