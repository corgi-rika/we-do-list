"use client";

import Link from "next/link";
import { useSignup } from "@/hooks/useSignup";
import AuthHeader from "@/components/AuthHeader";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import ValidationMessage from "@/components/ValidationMessage";

export default function SignupPage() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    error,
    loading,
    handleSubmit,
  } = useSignup();

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <AuthHeader subtitle="アカウントを作成" />

      <Card padding="lg" className="w-full flex flex-col gap-4">
        {error && <ValidationMessage message={error} center />}
        <Input
          label="ユーザー名"
          placeholder="山田太郎"
          value={username}
          onChange={setUsername}
        />
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
        <Input
          label="パスワード（確認）"
          type="password"
          placeholder="••••••••"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "登録中..." : "登録する"}
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
