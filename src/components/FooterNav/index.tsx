"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import type { NavItem } from "./type";

// フッターナビゲーションのアイテム定義
const navItems: NavItem[] = [
  {
    label: "マイページ",
    href: "/mypage",
    icon: <UserIcon className="w-6 h-6" />,
  },
  {
    label: "グループ",
    href: "/groups",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "ToDo",
    href: "/todos",
    icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />,
  },
];

export default function FooterNav() {
  const pathname = usePathname();

  return (
    // fixed + inset-x-0 + flex justify-center でmax-w-mdに中央寄せ
    <footer className="fixed bottom-0 inset-x-0 flex justify-center z-50 pointer-events-none">
      <nav className="w-full max-w-md bg-white border-t border-gray-100 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] pointer-events-auto">
        <ul className="flex">
          {navItems.map((item) => {
            // アクティブ時とそれ以外でテキスト色だけ変える
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const baseClass =
              "flex flex-col items-center gap-1 py-3 text-xs font-medium";
            const colorClass = isActive
              ? "text-primary"
              : "text-gray-400 hover:text-gray-500";
            const linkClass = `${baseClass} ${colorClass}`;

            return (
              <li key={item.href} className="flex-1">
                <Link href={item.href} className={linkClass}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
