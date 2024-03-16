import { useQuery } from "@tanstack/react-query";
import spotifyApi from "../spotify/spotifyApi";

const useTracksAndArtists = () => {
  const {
    isPending: isTracksPending,
    isError: isTracksError,
    data: tracksData,
  } = useQuery({
    queryKey: ["tracks"],
    queryFn: () => spotifyApi.fetchTop("tracks"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: true,
  });

  const {
    isPending: isArtistsPending,
    isError: isArtistsError,
    data: artistsData,
    refetch,
  } = useQuery({
    queryKey: ["artists"],
    queryFn: () => spotifyApi.fetchTop("artists"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: true,
  });

  const isPending = isTracksPending || isArtistsPending;
  const isError = isArtistsError || isTracksError;
  const data = { artists: artistsData, tracks: tracksData };

  return { isPending, isError, data: data, refetch };
};

export default useTracksAndArtists;
