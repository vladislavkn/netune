import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import spotifyApi from "../spotify/spotifyApi";
import UserTrack from "./UserTrack";

const UserTrackList: FC = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["tracks"],
    queryFn: () => spotifyApi.fetchTop("tracks"),
  });

  if (error) return <div>Error: cannot fetch tracks</div>;
  if (isPending) return <div>Loading tracks...</div>;

  return (
    <section>
      <h2>Tracks</h2>
      <ul>
        {data.items.map((track) => (
          <UserTrack key={track.id} track={track} />
        ))}
      </ul>
    </section>
  );
};

export default UserTrackList;
