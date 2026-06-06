import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import MutedText from "@/components/MutedText";
import IconBadge from "@/components/IconBadge";
import {
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  KeyIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      {/* ① アイコン・タイトル */}
      <div className="flex flex-col items-center gap-3">
        <IconBadge size="lg" shape="rounded">
          <ClipboardDocumentCheckIcon className="w-9 h-9 text-primary" />
        </IconBadge>
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
          icon={<UserGroupIcon className="w-6 h-6 text-primary" />}
          title="グループを作成"
          description="家族や友人とグループを作成"
        />
        <FeatureCard
          icon={<KeyIcon className="w-6 h-6 text-primary" />}
          title="コードで参加"
          description="グループコードで簡単に参加"
        />
        <FeatureCard
          icon={<HeartIcon className="w-6 h-6 text-primary" />}
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
