"use client";
import { useState } from "react";

import { MatchesTable } from "@/components/table/matchesTable";
import { LoadingButton } from "@/components/ui/loadingButton";

import { tweetMatchesAction } from "@actions/matches/tweetMatches.action";
import { Match, MatchJSON } from "@model/match.model";

interface AnnounceMatchesFormProps {
  matchesJson: MatchJSON[];
}

function AnnounceMatchesForm({ matchesJson }: AnnounceMatchesFormProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const action = tweetMatchesAction.bind(null, selectedIds);

  return (
    <div className="w-dvw">
      <div className="mx-2">
        <MatchesTable
          matches={matchesJson.map((matchJson) => Match.fromJSON(matchJson))}
          selectedIds={selectedIds}
          selectId={(id: string) => {
            setSelectedIds([...selectedIds, id]);
          }}
          unselectId={(id: string) => {
            setSelectedIds((prev) => {
              return prev.filter((selectedId) => selectedId !== id);
            });
          }}
        />
      </div>
      <form action={action} className="py-4">
        <LoadingButton className="mx-auto block">Tweet</LoadingButton>
      </form>
    </div>
  );
}

export default AnnounceMatchesForm;
