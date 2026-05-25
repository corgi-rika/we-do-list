"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./type";

// フッターナビゲーションのアイテム定義
const navItems: NavItem[] = [
  {
    label: "マイページ",
    href: "/mypage",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "グループ",
    href: "/groups",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "ToDo",
    href: "/todos",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
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
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            const baseClass = "flex flex-col items-center gap-1 py-3 text-xs font-medium";
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
