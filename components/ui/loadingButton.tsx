import { UpdateIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button, ButtonProps } from "@/components/ui/button";

type LoadingButtonProps = {
  isLoading: boolean;
};

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & LoadingButtonProps
>(({ isLoading, children, ...props }, ref) => {
  return (
    <Button {...props} disabled={isLoading} ref={ref}>
      {isLoading && <UpdateIcon className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  );
});

LoadingButton.displayName = "LoadingButton";
