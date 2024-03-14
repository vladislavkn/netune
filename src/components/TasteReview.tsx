import { FC } from "react";
import useTasteReview from "../hooks/useTasteReview";

const TasteReview: FC = () => {
  const { isPending, error, data } = useTasteReview();

  if (error) return <div>Error: cannot fetch review</div>;
  if (isPending) return <div>Loading review...</div>;

  return (
    <section>
      <h2>Review</h2>
      <p>{data}</p>
    </section>
  );
};

export default TasteReview;
