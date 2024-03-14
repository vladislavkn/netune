import { FC } from "react";
import UserTrackList from "../components/UserTrackList";
import UserArtistList from "../components/UserArtistList";
import TasteReview from "../components/TasteReview";

const Main: FC = () => {
  return (
    <main>
      <UserTrackList />
      <UserArtistList />
      <TasteReview />
    </main>
  );
};

export default Main;
