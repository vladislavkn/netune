import { FC, useEffect, useRef, useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import llmApi from "@/llm/llmApi";

interface RefetchFieldButtonProps extends ButtonProps {
  fieldName: string;
  refetchForce: () => void;
}

const RefetchFieldButton: FC<RefetchFieldButtonProps> = ({
  fieldName,
  refetchForce,
  ...buttonProps
}) => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [msLeft, setMsLeft] = useState(llmApi.getMSTillNextUpdate(fieldName));

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMsLeft(llmApi.getMSTillNextUpdate(fieldName));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const secondsLeftTotal = Math.round(msLeft / 1000);
  const minutesLeft = Math.floor(secondsLeftTotal / 60);
  const secondsLeft = secondsLeftTotal % 60;

  return (
    <Button
      variant="secondary"
      disabled={msLeft > 0}
      onClick={refetchForce}
      {...buttonProps}
      size="lg"
    >
      Refetch
      {msLeft > 0 ? (
        <span className="tabular-nums ml-1">
          ({minutesLeft > 0 ? `${minutesLeft}m ` : null}
          {secondsLeft}s left)
        </span>
      ) : null}
    </Button>
  );
};
export default RefetchFieldButton;
