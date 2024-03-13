import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import spotifyApi from "../spotify/spotifyApi";
import UserArtist from "./UserArtist";

const UserArtistList: FC = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["artists"],
    queryFn: () => spotifyApi.fetchTop("artists"),
  });

  if (error) return <div>Error: cannot fetch artists</div>;
  if (isPending) return <div>Loading artists...</div>;

  return (
    <section>
      <h2>Artists</h2>
      <ul>
        {data.items.map((artist) => (
          <UserArtist key={artist.id} artist={artist} />
        ))}
      </ul>
    </section>
  );
};

export default UserArtistList;
