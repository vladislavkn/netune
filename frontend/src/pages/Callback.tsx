import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyApi from "../api/SpotifyApi";

const Callback: FC = () => {
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const saveAccessToken = async () => {
      try {
        await SpotifyApi.setupAccessTokenOnCallbackPage();
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
