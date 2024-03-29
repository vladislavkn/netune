import share from "@/lib/share";
import { Share } from "lucide-react";
import { FC } from "react";

const Footer: FC = () => {
  const shareWithFriends = () =>
    share(
      "This AI recommends you new tracks!",
      "Check it out on https://vnetune.vercel.app"
    );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Did you like it?</h2>
      <p className="text-gray-600 text-xl">
        Then take a sec and{" "}
        <button
          onClick={shareWithFriends}
          className="inline-block hover:underline text-black font-medium"
        >
          <Share className="inline-block w-4 h-4" /> tell your friends about it!
        </button>
      </p>
    </section>
  );
};

export default Footer;
