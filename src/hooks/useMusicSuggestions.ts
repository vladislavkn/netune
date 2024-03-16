import { useQuery } from "@tanstack/react-query";
import llmApi from "../llm/llmApi";
import useTracks from "./useTracks";
import useArtists from "./useArtists";

const useMusicSuggestions = () => {
  const {
    isPending: isArtistsPending,
    isError: isArtistsError,
    data: artistsData,
  } = useArtists();

  const {
    isPending: isTracksPending,
    isError: isTracksError,
    data: tracksData,
  } = useTracks();

  const {
    isPending: isSuggestionsPending,
    isError: isSuggestionsError,
    data: suggestionsData,
  } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () => llmApi.fetchSuggestions(tracksData!, artistsData!),
    enabled: Boolean(tracksData && artistsData),
    retry: 3,
    retryDelay: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const isPending = isArtistsPending || isTracksPending || isSuggestionsPending;
  const isError = isArtistsError || isTracksError || isSuggestionsError;

  return { isPending, isError, data: suggestionsData };
};

export default useMusicSuggestions;
