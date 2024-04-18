"use client";
import { useState } from "react";

import { MatchesTable } from "@/components/table/matchesTable";
import { Button } from "@/components/ui/button";

import { tweetMatchesAction } from "@actions/matches/tweetMatches.action";
import { Match, MatchJSON } from "@model/match.model";

interface AnnounceMatchesFormProps {
  matchesJson: MatchJSON[];
}

function AnnounceMatchesForm({ matchesJson }: AnnounceMatchesFormProps) {
  const action = tweetMatchesAction.bind(null, ["clv13jjuf000jad7akmrnb4oj"]);

  const [matchesWithCheckedStatus, setMatchesWithCheckedStatus] = useState(
    matchesJson.map((matchJson) => ({
      data: Match.fromJSON(matchJson),
      checked: false,
    }))
  );
  const handleCheck = (index: number, checked: any) => {
    setMatchesWithCheckedStatus((prev) => {
      if (index >= prev.length) {
        return prev;
      }
      const newMatches = [...prev];
      console.log(prev);
      newMatches[index]!.checked = checked;
      return newMatches;
    });
  };

  return (
    <div>
      <MatchesTable matches={matchesWithCheckedStatus} onCheck={handleCheck} />
      <form action={action}>
        <Button>Tweet</Button>
      </form>
    </div>
  );
}

export default AnnounceMatchesForm;
