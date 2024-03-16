import { FC, useEffect } from "react";
import useUser from "@/hooks/useUser";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Github, LogOut } from "lucide-react";
import spotifyApi from "@/spotify/spotifyApi";

const Navigation: FC = () => {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="logo.jpg" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <h4 className="font-xl font-semibold tracking-tight">Netune</h4>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <a href="https://github.com/vladislavkn/netune" target="_blank">
            <Github className="w-4 h-4 mr-2" />{" "}
            <span className="hidden sm:block">Check it out on</span> Github
          </a>
        </Button>
        {user && (
          <Button variant="destructive" onClick={() => spotifyApi.logout()}>
            <LogOut className="ww-4 h-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
