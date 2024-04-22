import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button, ButtonProps } from "@/components/ui/button";

type LoadingButtonProps = {
  loading: boolean;
};

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & LoadingButtonProps
>(({ loading, children, ...props }, ref) => {
  return (
    <Button {...props} disabled={loading} ref={ref}>
      {loading && <ReloadIcon className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  );
});

LoadingButton.displayName = "LoadingButton";
