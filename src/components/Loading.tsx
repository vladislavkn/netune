import { LoaderCircle } from "lucide-react";
import { FC, ReactNode } from "react";

interface LoadingProps {
  children: ReactNode;
}

const Loading: FC<LoadingProps> = ({ children }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <LoaderCircle className="animate-spin h-6 w-6" />
    {children}
  </div>
);

export default Loading;
