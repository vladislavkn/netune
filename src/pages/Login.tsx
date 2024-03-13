import { FC } from "react";
import openAuthorisationPage from "../spotify/openAuthorisationPage";

const Login: FC = () => {
  return (
    <div>
      <button onClick={openAuthorisationPage}>Login with spotify</button>
    </div>
  );
};

export default Login;
