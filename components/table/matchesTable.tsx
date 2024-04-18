import { CheckedState } from "@radix-ui/react-checkbox";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Match } from "@model/match.model";

const taleLabels = {
  formattedScore: "試合結果",
};

type TableKeys = keyof typeof taleLabels;

interface MatchesTableProps {
  matches: {
    data: Match;
    checked: boolean;
  }[];
  onCheck: (index: number, checked: CheckedState) => void;
}

export function MatchesTable({ matches, onCheck }: MatchesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(taleLabels).map((key) => (
            <TableHead key={key}>{taleLabels[key as TableKeys]}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match, i) => (
          <TableRow key={match.data.id}>
            <TableCell key={`${match.data.id}_check`}>
              <Checkbox onCheckedChange={(checked) => onCheck(i, checked)} />
            </TableCell>
            <TableCell key={`${match.data.id}_formatted`}>
              {match.data.formattedScore}
            </TableCell>
          </TableRow>
        ))}
        <TableRow />
      </TableBody>
    </Table>
  );
}
