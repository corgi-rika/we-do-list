import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 保護されたページ
  const protectedPaths = ["/groups", "/todos", "/mypage"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // 未認証 + 保護ページ → /signin へ
  if (!data.user && isProtected) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 認証済み + /signin or /signup → /groups へ
  if (data.user && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/groups", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
