import { FC } from "react";
import useUser from "@/hooks/useUser";
import Loading from "./Loading";

const Header: FC = () => {
  const { user, isPending } = useUser();

  if (isPending) return <Loading>Loading your name...</Loading>;

  return (
    <div>
      <h2 className="text-4xl font-semibold">Hi, {user!.display_name}!</h2>
      <p className="text-2xl text-gray-600">Here are your stats:</p>
    </div>
  );
};

export default Header;
