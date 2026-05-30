import { UserGroupIcon } from "@heroicons/react/24/outline";

export default function GroupEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-muted">
      <UserGroupIcon className="w-12 h-12 opacity-30" />
      <p className="text-sm">まだグループがありません</p>
      <p className="text-xs">
        グループを作成するか、コードで参加してみましょう
      </p>
    </div>
  );
}
