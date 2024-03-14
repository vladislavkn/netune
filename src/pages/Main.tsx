import { FC } from "react";
import UserTrackList from "../components/UserTrackList";
import UserArtistList from "../components/UserArtistList";
import TasteReview from "../components/TasteReview";
import MusicSuggestions from "../components/MusicSuggestions";

const Main: FC = () => {
  return (
    <main>
      <UserTrackList />
      <UserArtistList />
      <TasteReview />
      <MusicSuggestions />
    </main>
  );
};

export default Main;
