import { Dispatch, SetStateAction } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/ui/loadingButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Match } from "@model/match.model";

interface MatchesTableProps {
  matches: {
    data: Match;
    checked: boolean;
  }[];
  setMatches: Dispatch<
    SetStateAction<
      {
        data: Match;
        checked: boolean;
      }[]
    >
  >;
}

export function MatchesTable({ matches, setMatches }: MatchesTableProps) {
  const handleCheck = (id: string) => {
    setMatches((prev) => {
      return prev.map((match) => {
        if (match.data.id === id) {
          return { ...match, checked: !match.checked };
        }
        return match;
      });
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`${process.env["NEXT_PUBLIC_ORIGIN"]}/api/matches/${id}`, {
      method: "delete",
      cache: "no-store",
    });

    setMatches((prev) => {
      return prev.filter((match) => {
        return match.data.id !== id;
      });
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{""}</TableHead>
          <TableHead>試合結果</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match) => (
          <TableRow
            className="cursor-pointer overflow-x-scroll whitespace-pre"
            key={match.data.id}
            onClick={() => {
              handleCheck(match.data.id);
            }}
          >
            <TableCell className="w-4">
              <Checkbox checked={match.checked} id={match.data.id} />
            </TableCell>
            <TableCell>{match.data.formattedScore}</TableCell>
            <TableCell>
              <LoadingButton
                variant="destructive"
                onClick={async (e) => {
                  e.stopPropagation();
                  await handleDelete(match.data.id);
                }}
                labelInLoading="削除中です"
              >
                削除
              </LoadingButton>
            </TableCell>
          </TableRow>
        ))}
        <TableRow />
      </TableBody>
    </Table>
  );
}
