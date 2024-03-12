import { FC } from "react";
import { Track } from "../api/SpotifyApi.types";

interface UserTrackProps {
  track: Track;
}

const UserTrack: FC<UserTrackProps> = ({ track }) => (
  <li>
    {track.name} ({track.artists.map((artist) => artist.name).join(", ")})
  </li>
);

export default UserTrack;
