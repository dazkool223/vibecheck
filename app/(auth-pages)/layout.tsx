export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gradient-to-b from-pink-500 to-orange-500 h-screen flex items-center justify-center">
      {children}
    </main>
  );
}
