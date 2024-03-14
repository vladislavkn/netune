import { useQuery } from "@tanstack/react-query";
import spotifyApi from "../spotify/spotifyApi";

const useArtists = () =>
  useQuery({
    queryKey: ["artists"],
    queryFn: () => spotifyApi.fetchTop("artists"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: true,
  });

export default useArtists;
