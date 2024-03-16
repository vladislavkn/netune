import { FC } from "react";
import useMusicSuggestions from "../hooks/useMusicSuggestions";
import TrackSuggestionItem from "./TrackSuggestionItem";

const MusicSuggestions: FC = () => {
  const { isPending, isError, data } = useMusicSuggestions();

  if (isError) return <div>Error: cannot fetch suggestions</div>;
  if (isPending) return <div>Loading suggestions...</div>;

  return (
    <section>
      <h2>Suggestions</h2>
      {data?.map((trackName) => (
        <TrackSuggestionItem key={trackName} trackName={trackName} />
      ))}
    </section>
  );
};

export default MusicSuggestions;
