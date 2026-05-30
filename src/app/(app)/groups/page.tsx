"use client";

import {
  PlusIcon,
  ArrowRightEndOnRectangleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { dummyGroups } from "@/dummy/groups";

export default function GroupsPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="grid grid-cols-2 gap-3">
        <Button variant="primary" fullWidth href="/groups/new">
          <span className="flex flex-col items-center gap-1">
            <PlusIcon className="w-6 h-6" />
            <span>グループを作成</span>
          </span>
        </Button>
        <Button variant="secondary" fullWidth href="/groups/join">
          <span className="flex flex-col items-center gap-1">
            <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
            <span>コードで参加</span>
          </span>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">参加中のグループ</p>
        <div className="flex flex-col gap-2">
          {dummyGroups.map((group) => (
            <Card key={group.id} padding="md" onClick={() => {}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                  <UserGroupIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {group.name}
                  </span>
                  <span className="text-sm text-muted">
                    {group.memberCount}人のメンバー
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
