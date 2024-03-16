import { useQuery } from "@tanstack/react-query";
import spotifyApi from "../spotify/spotifyApi";

const useUser = () => {
  const { error, isPending, data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => spotifyApi.fetchProfile(),
    refetchInterval: 300_0000,
    retry: false,
  });

  const isAuthorized = !isPending && !error;
  const user = isAuthorized ? data : undefined;

  return { user, isPending };
};

export default useUser;
