import { FC, useEffect, useState } from "react";
import spotifyApi from "../api/SpotifyApi";
import { useNavigate } from "react-router-dom";

const Main: FC = () => {
  const [userName, setUserName] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchProfile = async () => {
      setError(undefined);
      try {
        const { display_name } = await spotifyApi.fetchProfile();
        setUserName(display_name);
      } catch (e) {
        setError((e as Error).message);
      }
    };

    fetchProfile();
  }, []);

  const navigate = useNavigate();

  const handleLoginAgain = () => {
    spotifyApi.logout();
    navigate("/login");
  };

  if (error) {
    return (
      <div>
        <h1>Failed to load profile</h1>
        <p>{error}</p>
        <button onClick={handleLoginAgain}>Try to login again</button>
      </div>
    );
  }

  if (!userName) {
    return <div>Loading...</div>;
  }

  return <div>Hello, {userName}!</div>;
};

export default Main;
