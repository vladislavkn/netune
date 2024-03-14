import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

interface ProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRoute> = ({ children }) => {
  const { error, isPending } = useUser();
  const isAuthorized = !isPending && !error;

  if (isAuthorized) return children;

  if (isPending) return <div>Loading...</div>;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
