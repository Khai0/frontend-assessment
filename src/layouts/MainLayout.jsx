export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen w-full">
      <main className="mx-auto w-full">{children}</main>
    </div>
  );
}
