import { redirect } from "next/navigation";

import { getSession } from "@/server/auth/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b px-6 py-3">
        <nav className="flex items-center justify-between">
          <span className="text-lg font-semibold">My App</span>
          <span className="text-sm text-muted-foreground">
            {session.user.name}
          </span>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
