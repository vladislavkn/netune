import { FC } from "react";
import UserTrackList from "../components/UserTrackList";
import UserArtistList from "../components/UserArtistList";

const Main: FC = () => {
  return (
    <main>
      <UserTrackList />
      <UserArtistList />
    </main>
  );
};

export default Main;
