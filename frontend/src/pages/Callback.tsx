import { FC, useEffect, useState } from "react";
import getAuthCodeFromCurrentUrl from "../auth/getAuthCodeFromCurrentUrl";
import getAccessToken from "../auth/getAccessToken";
import { Link } from "react-router-dom";

const Callback: FC = () => {
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const saveAccessToken = async () => {
      try {
        const authCode = getAuthCodeFromCurrentUrl();
        if (!authCode) {
          throw Error("No auth code found");
        }
        const accessToken = await getAccessToken(authCode);
        localStorage.setItem("accessToken", accessToken);
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
