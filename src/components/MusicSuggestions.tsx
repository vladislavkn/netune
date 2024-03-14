import { FC } from "react";
import useMusicSuggestions from "../hooks/useMusicSuggestions";

const MusicSuggestions: FC = () => {
  const { isPending, error, data } = useMusicSuggestions();

  if (error) return <div>Error: cannot fetch suggestions</div>;
  if (isPending) return <div>Loading suggestions...</div>;

  return (
    <section>
      <h2>Suggestions</h2>
      <p>{data}</p>
    </section>
  );
};

export default MusicSuggestions;
