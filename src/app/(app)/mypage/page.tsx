"use client";

import {
  Cog6ToothIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import MutedText from "@/components/MutedText";
import { useMyTodos } from "@/hooks/useMyTodos";
import { useState } from "react";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useGroups } from "@/hooks/useGroups";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function MypagePage() {
  const router = useRouter();
  const { groups } = useGroups();
  const { incompleteCount } = useMyTodos();
  const incompleteDisplay =
    incompleteCount >= 100 ? "100+" : String(incompleteCount);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user } = useCurrentUser();
  const userName = user?.username ?? "";
  const userEmail = user?.email ?? "";

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

      {/* 設定メニュー 今後実装予定*/}
      {/*       
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
      </Card> */}

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
        <DeleteConfirmModal
          title="ログアウト"
          message={{ title: "ログアウトしますか？" }}
          confirmLabel="ログアウト"
          onConfirm={handleLogout}
          onClose={() => setIsLogoutModalOpen(false)}
        />
      )}
    </div>
  );
}
