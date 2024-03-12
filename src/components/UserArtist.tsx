import { FC } from "react";
import { Artist } from "../api/SpotifyApi.types";

interface UserArtistProps {
  artist: Artist;
}

const UserArtist: FC<UserArtistProps> = ({ artist }) => (
  <li>
    {artist.name} ({artist.followers.total}) - {artist.genres.join(", ")}
  </li>
);

export default UserArtist;
