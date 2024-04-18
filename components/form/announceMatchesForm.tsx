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
  const handleCheck = (index: number) => {
    setMatchesWithCheckedStatus((prev) => {
      return prev.map((match, i) => {
        if (i === index) {
          return { ...match, checked: !match.checked };
        }
        return match;
      });
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
