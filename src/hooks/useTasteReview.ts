import { useQuery } from "@tanstack/react-query";
import llmApi from "../llm/llmApi";
import useTracks from "./useTracks";
import useArtists from "./useArtists";

const useTasteReview = () => {
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
    isPending: isReviewPending,
    error: reviewError,
    data: reviewData,
  } = useQuery({
    queryKey: ["review"],
    queryFn: () => llmApi.fetchMusicTaste(tracksData!, artistsData!),
    enabled: Boolean(tracksData && artistsData),
    retry: 3,
    retryDelay: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const isPending = isArtistsPending || isTracksPending || isReviewPending;
  const error = artistsError || tracksError || reviewError;

  return { isPending, error, data: reviewData };
};

export default useTasteReview;
