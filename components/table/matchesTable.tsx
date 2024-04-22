import { Dispatch, SetStateAction, useState } from "react";

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
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleCheck = (index: number) => {
    setMatches((prev) => {
      return prev.map((match, i) => {
        if (i === index) {
          return { ...match, checked: !match.checked };
        }
        return match;
      });
    });
  };

  const handleDelete = async (id: string) => {
    setDeleteLoading(true);

    await fetch(`${process.env["NEXT_PUBLIC_ORIGIN"]}/api/matches/${id}`, {
      method: "delete",
      cache: "no-store",
    });

    setMatches((prev) => {
      return prev.filter((match) => {
        return match.data.id !== id;
      });
    });
    setDeleteLoading(false);
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
        {matches.map((match, i) => (
          <TableRow
            className="cursor-pointer overflow-x-scroll whitespace-pre"
            key={match.data.id}
            onClick={() => {
              handleCheck(i);
            }}
          >
            <TableCell className="w-4">
              <Checkbox checked={match.checked} id={match.data.id} />
            </TableCell>
            <TableCell>{match.data.formattedScore}</TableCell>
            <TableCell>
              <LoadingButton
                variant="destructive"
                loading={deleteLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(match.data.id);
                }}
              >
                {deleteLoading ? "削除中です" : "削除"}
              </LoadingButton>
            </TableCell>
          </TableRow>
        ))}
        <TableRow />
      </TableBody>
    </Table>
  );
}
