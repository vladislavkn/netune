import { useQuery } from "@tanstack/react-query";
import llmApi from "../llm/llmApi";
import useTracksAndArtists from "./useTracksAndArtists";
import { useRef } from "react";
import queryClient from "@/lib/tanstack-query";
import { toast } from "sonner";

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
      llmApi.fetchSuggestions(
        spotifyData!.tracks,
        spotifyData!.artists,
        isForceEnabled.current
      ),
    enabled: Boolean(spotifyData),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
  });

  const isForceEnabled = useRef(false);
  const refetchForce = async () => {
    toast("Refetching suggestions...");
    isForceEnabled.current = true;
    await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    isForceEnabled.current = false;
  };

  const isPending = isSpotifyPending || isSuggestionsPending;
  const isError = isSpotifyError || isSuggestionsError;
  return { isPending, isError, data: suggestionsData, refetch, refetchForce };
};

export default useMusicSuggestions;
