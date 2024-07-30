import { UpdateIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";

type LoadingButtonProps = {
  loading?: boolean;
  labelInLoading?: string;
};

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & LoadingButtonProps
>(({ loading, labelInLoading, children, onClick, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    await onClick?.(e);
    setIsLoading(false);
  };
  return (
    <Button
      {...props}
      disabled={isLoading || loading}
      ref={ref}
      onClick={handleClick}
    >
      {loading === undefined ? (
        isLoading ? (
          <>
            <UpdateIcon className="mr-2 size-4 animate-spin" />
            {labelInLoading ?? children}
          </>
        ) : (
          children
        )
      ) : loading ? (
        <>
          <UpdateIcon className="mr-2 size-4 animate-spin" />
          {labelInLoading ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
});

LoadingButton.displayName = "LoadingButton";
