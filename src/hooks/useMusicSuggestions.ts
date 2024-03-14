import { useQuery } from "@tanstack/react-query";
import llmApi from "../llm/llmApi";
import useTracks from "./useTracks";
import useArtists from "./useArtists";

const useMusicSuggestions = () => {
  const {
    isPending: isArtistsPending,
    error: artistsError,
    data: artistsData,
  } = useArtists();

  const {
    isPending: isTracksPending,
    error: tracksError,
    data: tracksData,
  } = useTracks();

  const {
    isPending: isSuggestionsPending,
    error: suggestionsError,
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
  const error = artistsError || tracksError || suggestionsError;

  return { isPending, error, data: suggestionsData };
};

export default useMusicSuggestions;
