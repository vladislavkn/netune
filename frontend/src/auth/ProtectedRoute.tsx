import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRoute> = ({ children }) => {
  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
