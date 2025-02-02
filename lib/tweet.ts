import { Match } from "@model/match.model";

export function calculateTweetLength(text: string): number {
  let length = 0;
  for (const char of text) {
    if (char === "\n") {
      // 改行文字
      length += 2;
    } else if (char.match(/[ -~]/)) {
      // 半角文字
      length += 1;
    } else {
      // 全角文字
      length += 2;
    }
  }
  return length;
}

export function generateTweetText(
  matchesNotAnnounced: Match[],
  isTeam: boolean
) {
  return isTeam
    ? generateTweetTextTeam(matchesNotAnnounced)
    : generateTweetTextPersonal(matchesNotAnnounced);
}

export function generateTweetTextPersonal(matchesNotAnnounced: Match[]) {
  const resultDividedByMatchMeta: Record<string, string[]> = {};
  matchesNotAnnounced.forEach((match) => {
    const matchMetaType = match.matchMeta.type;
    if (!resultDividedByMatchMeta[matchMetaType]) {
      resultDividedByMatchMeta[matchMetaType] = [];
    }
    resultDividedByMatchMeta[matchMetaType].push(match.formattedScore);
  });
  // save the tweet text length
  // let tweetText: string = tournamentName ? `【${tournamentName}】\n` : "";
  let tweetText: string = "";
  tweetText += Object.entries(resultDividedByMatchMeta)
    .map(([key, value]) => {
      let text = `${key}`;
      value.map((el) => {
        text += `\n${el}`;
      });
      text += `\n`;
      return text;
    })
    .join("\n");
  return tweetText;
}

export function generateTweetTextTeam(matchesNotAnnounced: Match[]) {
  const matchMetaTypes = matchesNotAnnounced[0]?.matchMeta.type;
  matchesNotAnnounced.forEach((match) => {
    if (match.matchMeta.type !== matchMetaTypes) {
      throw new Error("Match type is not the same");
    }
  });
  const univs = matchesNotAnnounced.map((match) => {
    return match.winner.university.id;
  });
  const univCount = univs.reduce(
    (acc, cur) => {
      if (acc[cur]) {
        acc[cur] += 1;
      } else {
        acc[cur] = 1;
      }
      return acc;
    },
    {} as Record<number, number>
  );
  const univKeys = Object.keys(univCount);
  const winnerTeamId =
    univCount[Number(univKeys[0])]! > matchesNotAnnounced.length / 2
      ? Number(univKeys[0])
      : Number(univKeys[1]);

  let tweetText: string = `【${matchMetaTypes}】\n`;
  tweetText += matchesNotAnnounced
    .map((match) => {
      const winnerTeamPlayer =
        match.winner.university.id === winnerTeamId
          ? match.winner
          : match.loser;
      return `${match.formattedScoreWithFirstPlayerSelection(winnerTeamPlayer)}`;
    })
    .join("\n");
  return tweetText;
}
