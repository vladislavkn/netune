import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpotifyApi from "../spotify/spotifyApi";
import { Button } from "@/components/ui/button";

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
        <h1 className="text-xl mb-2">Authorization failed</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link to="/">
          <Button>Return to login</Button>
        </Link>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default Callback;
