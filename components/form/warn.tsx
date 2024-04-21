import React from "react";

import { cn } from "@/lib/utils";

interface WarnProps {
  children: React.ReactNode;
  classNames?: string;
}

export const Warn = ({ children, classNames }: WarnProps) => {
  return (
    <div className={cn("min-h-5 text-red-500", classNames)}>{children}</div>
  );
};
