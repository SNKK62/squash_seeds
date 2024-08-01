import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

async function TournamentLayout({ children }: { children: React.ReactNode }) {
  const res = await fetch(
    `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/tournament/open`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  if (res.status !== 200) {
    return (
      <div className="flex h-screen flex-col justify-center gap-4 text-center align-middle">
        <div>開催されている大会はありません</div>
        <Link href="/auth/login" className="text-blue-500 underline">
          ログイン画面へ
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

export default TournamentLayout;
