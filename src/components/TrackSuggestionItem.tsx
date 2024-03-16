import { FC } from "react";
import useSearchedTrack from "../hooks/useSearchedTrack";

interface TrackSuggestionItemProps {
  trackName: string;
}

const TrackSuggestionItem: FC<TrackSuggestionItemProps> = ({ trackName }) => {
  const { isError, isPending, data } = useSearchedTrack(trackName);

  if (isError)
    return <div>Error: cannot fetch track "{trackName}" from spotify</div>;
  if (isPending) return <div>Loading track "{trackName}"...</div>;

  return (
    <div>
      <a href={data.external_urls.spotify}>
        {data.name} ({data.artists.map((artist) => artist.name).join(", ")})
      </a>
    </div>
  );
};

export default TrackSuggestionItem;
