import { FC } from "react";
import useTasteReview from "../hooks/useTasteReview";
import ErrorAlert from "./Error";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";

const TasteReview: FC = () => {
  const { isPending, isError, data, refetch } = useTasteReview();

  if (isError)
    return <ErrorAlert onReload={refetch}>Failed to load review</ErrorAlert>;
  if (isPending)
    return <Loading>Asking AI to review yoour music taste...</Loading>;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-2">
        We asked AI what it thinks about your music taste
      </h2>
      <p className="text-xl text-gray-600 mb-4 leading-12 font-light">
        <span className="inline-block px-2 h-8 bg-zinc-200 rounded text-center leading-8 text-base mr-1">
          AI says:
        </span>
        {data}
      </p>
      <Button size="lg">
        <Share2 className="h-6 w-6 mr-4" /> Share
      </Button>
    </section>
  );
};

export default TasteReview;
