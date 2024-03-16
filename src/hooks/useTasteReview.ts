import { useQuery } from "@tanstack/react-query";
import llmApi from "../llm/llmApi";
import useTracksAndArtists from "./useTracksAndArtists";
import { useRef } from "react";
import queryClient from "@/lib/tanstack-query";
import { toast } from "sonner";

const useTasteReview = () => {
  const {
    isPending: isSpotifyPending,
    isError: isSpotifyError,
    data: spotifyData,
  } = useTracksAndArtists();

  const {
    isPending: isReviewPending,
    isError: isReviewError,
    data: reviewData,
    refetch,
  } = useQuery({
    queryKey: ["review"],
    queryFn: () =>
      llmApi.fetchMusicTaste(
        spotifyData!.tracks!,
        spotifyData!.artists!,
        isForceEnabled.current
      ),
    enabled: Boolean(spotifyData),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const isForceEnabled = useRef(false);
  const refetchForce = async () => {
    toast("Refetching taste review...");
    isForceEnabled.current = true;
    await queryClient.invalidateQueries({ queryKey: ["review"] });
    isForceEnabled.current = false;
  };

  const isPending = isSpotifyPending || isReviewPending;
  const isError = isSpotifyError || isReviewError;

  return { isPending, isError, data: reviewData, refetch, refetchForce };
};

export default useTasteReview;
