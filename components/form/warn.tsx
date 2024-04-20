import React from "react";

export const Warn = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-5 text-red-500">{children}</div>;
};
