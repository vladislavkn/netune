import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

interface ProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRoute> = ({ children }) => {
  const { isPending, user } = useUser();

  if (user) return children;

  if (isPending) return <div>Loading...</div>;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
