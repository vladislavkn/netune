import { useQuery } from "@tanstack/react-query";
import spotifyApi from "../spotify/spotifyApi";

const useUser = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: () => spotifyApi.fetchProfile(),
    refetchInterval: 300_0000,
    retry: false,
  });

export default useUser;
