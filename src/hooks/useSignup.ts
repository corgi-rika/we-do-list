import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useSignup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");

    if (!username || !email || !password || !passwordConfirm) {
      setError("すべての項目を入力してください");
      return;
    }
    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      return;
    }
    if (password !== passwordConfirm) {
      setError("パスワードが一致しません");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, full_name: username } },
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    alert("確認メールを送信しました。メールを確認してください。");
  }

  return {
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
  };
}
