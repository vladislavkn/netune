import { useQuery } from "@tanstack/react-query";
import llmApi from "../llm/llmApi";
import useTracksAndArtists from "./useTracksAndArtists";

const useMusicSuggestions = () => {
  const {
    isPending: isSpotifyPending,
    isError: isSpotifyError,
    data: spotifyData,
  } = useTracksAndArtists();

  const {
    isPending: isSuggestionsPending,
    isError: isSuggestionsError,
    data: suggestionsData,
    refetch,
  } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () =>
      llmApi.fetchSuggestions(spotifyData!.tracks, spotifyData!.artists),
    enabled: Boolean(spotifyData),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const isPending = isSpotifyPending || isSuggestionsPending;
  const isError = isSpotifyError || isSuggestionsError;
  return { isPending, isError, data: suggestionsData, refetch };
};

export default useMusicSuggestions;
