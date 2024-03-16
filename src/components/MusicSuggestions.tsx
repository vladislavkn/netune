import { FC } from "react";
import useMusicSuggestions from "../hooks/useMusicSuggestions";
import TrackSuggestionItem from "./TrackSuggestionItem";
import ErrorAlert from "./Error";
import Loading from "./Loading";
import SpotifySection from "./SporifySection";

const MusicSuggestions: FC = () => {
  const { isPending, isError, data, refetch } = useMusicSuggestions();

  if (isError)
    return (
      <ErrorAlert onReload={refetch}>Failed to load suggestions</ErrorAlert>
    );
  if (isPending)
    return <Loading>Asking AI about tracks you may also like...</Loading>;

  return (
    <SpotifySection
      items={data!.map((title) => ({ title, id: title }))}
      title="AI recommends you to check those tracks"
      itemComponent={TrackSuggestionItem}
    />
  );
};

export default MusicSuggestions;
