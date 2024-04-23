"use client";
import { useMemo, useState } from "react";

import { MatchesTable } from "@/components/table/matchesTable";
import { Button } from "@/components/ui/button";

import { tweetMatchesAction } from "@actions/matches/tweetMatches.action";
import { Match, MatchJSON } from "@model/match.model";

interface AnnounceMatchesFormProps {
  matchesJson: MatchJSON[];
}

function AnnounceMatchesForm({ matchesJson }: AnnounceMatchesFormProps) {
  const [matchesWithCheckedStatus, setMatchesWithCheckedStatus] = useState(
    matchesJson.map((matchJson) => ({
      data: Match.fromJSON(matchJson),
      checked: false,
    }))
  );

  const selectedIds = useMemo(() => {
    return matchesWithCheckedStatus
      .filter((matchWithCheckedStatus) => {
        return matchWithCheckedStatus.checked;
      })
      .map((selectedMatch) => {
        return selectedMatch.data.id;
      });
  }, [matchesWithCheckedStatus]);

  const action = tweetMatchesAction.bind(null, selectedIds);

  return (
    <div className="w-dvw">
      <div className="mx-2">
        <MatchesTable
          matches={matchesWithCheckedStatus}
          setMatches={setMatchesWithCheckedStatus}
        />
      </div>
      <form action={action} className="py-4">
        <Button className="mx-auto block">Tweet</Button>
      </form>
    </div>
  );
}

export default AnnounceMatchesForm;
