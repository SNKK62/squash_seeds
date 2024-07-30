"use client";
import Link from "next/link";
import React from "react";

function TournamentMatchesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div role="navigation" className="flex gap-4 bg-slate-600 p-4">
        <Link
          href="/tournament/matches/notAnnounced"
          className="text-white underline"
        >
          ツイート
        </Link>
        <Link href="/tournament/matches/new" className="text-white underline">
          試合結果入力
        </Link>
      </div>
      {children}
    </div>
  );
}

export default TournamentMatchesLayout;
