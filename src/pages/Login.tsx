import { FC } from "react";
import openAuthorisationPage from "../spotify/openAuthorisationPage";
import { Button } from "@/components/ui/button";
import { LogIn as LoginIcon } from "lucide-react";

const Login: FC = () => {
  return (
    <div className="container max-w-[38rem] mx-auto mt-24 flex flex-col items-stretch">
      <h2 className="font-bold text-4xl md:text-6xl">Use the power of AI</h2>
      <h3 className="font-medium text-4xl md:text-6xl text-gray-400 mb-8">
        to find new tracks to listen to.
      </h3>
      <Button onClick={openAuthorisationPage}>
        <LoginIcon className="w-4 h-4 mr-2" /> Login with spotify
      </Button>
    </div>
  );
};

export default Login;
