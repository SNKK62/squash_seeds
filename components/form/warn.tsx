import React from "react";

import { cn } from "@/lib/utils";

interface WarnProps {
  children: React.ReactNode;
  className?: string;
}

export const Warn = ({ children, className }: WarnProps) => {
  return (
    <div className={cn("min-h-5 text-red-500", className)}>{children}</div>
  );
};
