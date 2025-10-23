export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import Header from "@/components/Header";
import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

type LayoutProps = { children: ReactNode };

const Layout = async ({ children }: LayoutProps) => {
  const auth = await getAuth();
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <main className="min-h-screen text-gray-400">
      <Header user={user} />
      <div className="container py-10">{children}</div>
    </main>
  );
};

export default Layout;
