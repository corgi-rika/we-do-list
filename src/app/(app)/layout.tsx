import { Suspense } from "react";
import FooterNav from "@/components/FooterNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md min-h-screen flex flex-col bg-white">
      <main className="flex-1 pb-20 px-4 pt-4">{children}</main>
      <Suspense fallback={null}>
        <FooterNav />
      </Suspense>
    </div>
  );
}
