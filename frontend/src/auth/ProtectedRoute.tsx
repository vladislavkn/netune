import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import SpotifyApi from "../api/SpotifyApi";

interface ProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRoute> = ({ children }) => {
  if (SpotifyApi.isAuthorized()) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
