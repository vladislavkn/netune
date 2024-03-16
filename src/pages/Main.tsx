import { FC } from "react";
import TasteReview from "../components/TasteReview";
import MusicSuggestions from "../components/MusicSuggestions";
import Header from "@/components/Header";
import SpotifyUserStats from "../components/SpotifyUserData";
import Footer from "@/components/Footer";

const Main: FC = () => {
  return (
    <>
      <Header />
      <SpotifyUserStats />
      <TasteReview />
      <MusicSuggestions />
      <Footer />
    </>
  );
};

export default Main;
