import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpotifyApi from "../spotify/spotifyApi";

const Callback: FC = () => {
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const saveAccessToken = async () => {
      try {
        await SpotifyApi.setupAccessTokenOnCallbackPage();
        navigate("/");
      } catch (e) {
        setError((e as Error).message);
      }
    };

    saveAccessToken();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Authorization failed</h1>
        <p>{error}</p>
        <Link to="/">Return to login</Link>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default Callback;
