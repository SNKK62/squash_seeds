"use client";

import { CommandList } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import type { ComboboxLabel } from "@/components/ui/combobox.d";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ComboboxProps {
  id: string;
  dataList: ComboboxLabel[];
  // control is type from conform field
  control?: {
    value: string | undefined;
    change: React.Dispatch<React.SetStateAction<string | undefined>>;
    focus: () => void;
    blur: () => void;
  };
  label: string;
  className?: string;
}

export function Combobox({
  id,
  dataList,
  control,
  label,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    if (!value) {
      return;
    }
    const foundData = dataList.find((data) => {
      return data.value === value;
    });
    if (!foundData) {
      setValue("");
      control?.change("");
    }
  }, [dataList, value, control]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[230px] justify-between overflow-hidden", className)}
          id={id}
        >
          {value
            ? dataList.find((data) => data.value === value)?.label
            : `${label}を選択...`}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[230px] p-0", className)}>
        <Command>
          <CommandInput placeholder={`${label}を検索...`} />
          <CommandList>
            <CommandEmpty>{`${label}`}が見つかりません</CommandEmpty>
            <CommandGroup>
              {dataList.map((data) => (
                <CommandItem
                  key={data.value}
                  value={data.value}
                  onSelect={(newValue: string) => {
                    control?.change(
                      newValue === value
                        ? ""
                        : dataList.find((data) => data.value === newValue)?.key
                    );
                    setValue((prevVal) =>
                      newValue === prevVal ? "" : newValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === data.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
