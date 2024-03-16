import { FC } from "react";
import ErrorAlert from "./Error";
import Loading from "./Loading";
import SpotifySection from "./SporifySection";
import useTracksAndArtists from "@/hooks/useTracksAndArtists";
import SpotifySectionItem from "./SpotifySectionItem";

const SpotifyUserStats: FC = () => {
  const { isPending, isError, data, refetch } = useTracksAndArtists();

  if (isError)
    return (
      <ErrorAlert onReload={refetch}>
        Oh no! We cannot load your spotify stats
      </ErrorAlert>
    );
  if (isPending) return <Loading>Loading your stats...</Loading>;

  return (
    <div className="bg-zinc-900 rounded-lg">
      <SpotifySection
        title="Tracks"
        items={data.tracks!.map((track) => ({
          id: track.id,
          title: track.name,
          secondLine: track.artists.map((artist) => artist.name).join(", "),
          url: track.external_urls.spotify,
          imageSrc: track?.album?.images?.[0]?.url,
        }))}
        itemComponent={SpotifySectionItem}
      />
      <SpotifySection
        title="Artists"
        items={data.artists!.map((artist) => ({
          id: artist.id,
          title: artist.name,
          secondLine: artist.followers.total + " followers",
          url: artist.external_urls.spotify,
          imageSrc: artist?.images?.[0].url,
        }))}
        itemComponent={SpotifySectionItem}
      />
    </div>
  );
};

export default SpotifyUserStats;
