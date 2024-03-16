import { FC, ReactNode } from "react";
import { Button } from "./ui/button";

interface ErrorAlertProps {
  children: ReactNode;
  onReload: () => void;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ children, onReload }) => (
  <div className="p-2 rounded flex items-center justify-between border border-red-200 bg-red-50">
    {children}
    <Button variant="outline" size="sm" onClick={onReload}>
      Reload
    </Button>
  </div>
);

export default ErrorAlert;
