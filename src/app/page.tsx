export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20 text-center">
      {/* アプリアイコン */}
      <div className="w-20 h-20 rounded-3xl bg-primary-light flex items-center justify-center">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#6bba8f" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>

      {/* タイトル・説明 */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold text-foreground">We Do List</h1>
        <p className="text-base text-muted leading-relaxed">
          （we do list の簡単な説明文）
        </p>
      </div>

      {/* ナビゲーションボタン（仮） */}
      <div className="flex flex-col gap-3 w-full">
        <a
          href="/groups"
          className="w-full py-4 px-6 bg-primary text-white text-base font-semibold rounded-2xl text-center transition-opacity hover:opacity-90"
        >
          グループを見る
        </a>
        <a
          href="/signin"
          className="w-full py-4 px-6 bg-primary-light text-primary text-base font-semibold rounded-2xl text-center transition-opacity hover:opacity-90"
        >
          ログインする
        </a>
      </div>
    </div>
  );
}

