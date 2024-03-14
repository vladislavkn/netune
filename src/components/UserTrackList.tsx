import { FC } from "react";
import UserTrack from "./UserTrack";
import useTracks from "../hooks/useTracks";

const UserTrackList: FC = () => {
  const { isPending, error, data } = useTracks();

  if (error) return <div>Error: cannot fetch tracks</div>;
  if (isPending) return <div>Loading tracks...</div>;

  return (
    <section>
      <h2>Tracks</h2>
      <ul>
        {data.map((track) => (
          <UserTrack key={track.id} track={track} />
        ))}
      </ul>
    </section>
  );
};

export default UserTrackList;
