export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md min-h-screen flex flex-col bg-white">
      <main className="flex-1 px-4 pt-4">
        {children}
      </main>
    </div>
  );
}
