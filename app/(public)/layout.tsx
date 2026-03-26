export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="w-full max-w-md p-6">{children}</div>
    </div>
  );
}
