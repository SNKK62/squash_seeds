import { cookies } from "next/headers";
import React from "react";

async function TournamentLayout({ children }: { children: React.ReactNode }) {
  const res = await fetch(`${process.env["ORIGIN"]}/api/tournament/open`, {
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (res.status !== 200) {
    return <div>開催されている大会はありません</div>;
  }

  return <>{children}</>;
}

export default TournamentLayout;
