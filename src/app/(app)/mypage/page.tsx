"use client";

import {
  CheckCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import MutedText from "@/components/MutedText";
import { useTodoStore } from "@/store/todoStore";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useGroups } from "@/hooks/useGroups";

export default function MypagePage() {
  const router = useRouter();
  const { groups } = useGroups();
  const { todos } = useTodoStore();
  const incompleteCount = todos.filter((t) => !t.completed).length;
  const incompleteDisplay =
    incompleteCount >= 100 ? "100+" : String(incompleteCount);
  const recentCompleted = todos.filter((t) => t.completed).slice(0, 3);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("user_id", user.id)
          .single();
        setUserName(profile?.username ?? "");
        setUserEmail(user.email ?? "");
      }
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/signin");
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <h1 className="text-xl font-bold text-foreground">マイページ</h1>

      {/* プロフィール */}
      <Card padding="md">
        <div className="flex items-center gap-4">
          <Avatar name={userName || "？"} size="lg" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-foreground">{userName}</p>
            <MutedText>{userEmail}</MutedText>
          </div>
        </div>
      </Card>

      {/* 利用状況 */}
      <Card padding="md">
        <p className="text-sm font-semibold text-foreground mb-3">利用状況</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-100 p-4 gap-1">
            <span className="text-3xl font-bold text-foreground">
              {groups.length}
            </span>
            <MutedText size="xs">参加グループ数</MutedText>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-primary-light p-4 gap-1">
            <span className="text-3xl font-bold text-foreground">
              {incompleteDisplay}
            </span>
            <MutedText size="xs">未完了ToDo数</MutedText>
          </div>
        </div>
      </Card>

      {/* 最近完了したToDo */}
      <Card padding="md">
        <p className="text-sm font-semibold text-foreground mb-3">
          最近完了したToDo
        </p>
        {recentCompleted.length > 0 ? (
          <div className="flex flex-col gap-2">
            {recentCompleted.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
              >
                <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-foreground">{todo.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">完了したToDoはありません</p>
        )}
      </Card>

      {/* 設定メニュー */}
      <Card padding="md">
        <div className="flex flex-col divide-y divide-gray-100">
          {[
            {
              icon: <Cog6ToothIcon className="w-5 h-5" />,
              label: "アカウント設定",
            },
            { icon: <BellIcon className="w-5 h-5" />, label: "通知設定" },
            {
              icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
              label: "ヘルプ",
            },
          ].map(({ icon, label }) => (
            <button
              key={label}
              type="button"
              className="flex items-center gap-3 py-3 px-2 -mx-2 rounded-lg text-foreground hover:bg-gray-200 transition-colors"
            >
              <span className="text-muted">{icon}</span>
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* ログアウト */}
      <button
        type="button"
        onClick={() => setIsLogoutModalOpen(true)}
        className="flex items-center justify-center gap-2 w-full py-3 text-red-500 rounded-2xl hover:bg-red-50 transition-colors"
      >
        <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
        <span className="text-base font-medium">ログアウト</span>
      </button>

      {isLogoutModalOpen && (
        <Modal title="ログアウト" onClose={() => setIsLogoutModalOpen(false)}>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col items-center gap-2 bg-red-50 rounded p-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
              <p className="text-sm font-medium text-red-600">
                ログアウトしますか？
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setIsLogoutModalOpen(false)}
              >
                キャンセル
              </Button>
              <Button variant="destructive" fullWidth onClick={handleLogout}>
                ログアウト
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
