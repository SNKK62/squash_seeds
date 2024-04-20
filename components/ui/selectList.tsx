import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectListProps {
  id: string;
  name: string;
  label: string;
  dataList: {
    value: string;
    label: string;
  }[];
}

export function SelectList({ id, name, dataList, label }: SelectListProps) {
  return (
    <Select name={name}>
      <SelectTrigger className="w-[180px]" id={id}>
        <SelectValue placeholder={`${label}を選択してください`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {dataList.map((data) => {
            return (
              <SelectItem key={data.value} value={data.value}>
                {data.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
