import { useQuery } from "@tanstack/react-query";
import llmApi from "../llm/llmApi";
import useTracksAndArtists from "./useTracksAndArtists";

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
      llmApi.fetchMusicTaste(spotifyData!.tracks!, spotifyData!.artists!),
    enabled: Boolean(spotifyData),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const isPending = isSpotifyPending || isReviewPending;
  const isError = isSpotifyError || isReviewError;

  return { isPending, isError, data: reviewData, refetch };
};

export default useTasteReview;
