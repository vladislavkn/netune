import { useQuery } from "@tanstack/react-query";
import spotifyApi from "../spotify/spotifyApi";

const useSearchedTrack = (trackName: string) =>
  useQuery({
    queryKey: [trackName],
    queryFn: () => spotifyApi.searchTrack(trackName),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

export default useSearchedTrack;
