import { FC } from "react";
import useSearchedTrack from "../hooks/useSearchedTrack";
import SpotifySectionItem from "./SpotifySectionItem";

interface TrackSuggestionItemProps {
  title: string;
  id: string;
}

const TrackSuggestionItem: FC<TrackSuggestionItemProps> = ({ title }) => {
  const { isError, isPending, data } = useSearchedTrack(title);

  if (isError || isPending) return null;

  return (
    <SpotifySectionItem
      title={data.name}
      url={data.external_urls.spotify}
      secondLine={data.artists.map((artist) => artist.name).join(", ")}
      id={data.id}
      imageSrc={data?.album?.images?.[0]?.url}
    />
  );
};

export default TrackSuggestionItem;
