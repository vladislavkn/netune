import { FC } from "react";
import UserArtist from "./UserArtist";
import useArtists from "../hooks/useArtists";

const UserArtistList: FC = () => {
  const { isPending, error, data } = useArtists();

  if (error) return <div>Error: cannot fetch artists</div>;
  if (isPending) return <div>Loading artists...</div>;

  return (
    <section>
      <h2>Artists</h2>
      <ul>
        {data.map((artist) => (
          <UserArtist key={artist.id} artist={artist} />
        ))}
      </ul>
    </section>
  );
};

export default UserArtistList;
