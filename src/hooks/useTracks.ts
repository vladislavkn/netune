import { useQuery } from "@tanstack/react-query";
import spotifyApi from "../spotify/spotifyApi";

const useTracks = () =>
  useQuery({
    queryKey: ["tracks"],
    queryFn: () => spotifyApi.fetchTop("tracks"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: true,
  });

export default useTracks;
