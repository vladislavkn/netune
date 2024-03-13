import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import spotifyApi from "../spotify/spotifyApi";

interface ProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRoute> = ({ children }) => {
  const { error, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => spotifyApi.fetchProfile(),
  });
  const isAuthorized = !isPending && !error;

  if (isAuthorized) return children;

  if (isPending) return <div>Loading...</div>;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
