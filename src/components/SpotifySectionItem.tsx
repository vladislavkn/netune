import { FC } from "react";
import { ExternalLink } from "lucide-react";

export interface SpootifySectionItemProps {
  title: string;
  url: string;
  secondLine: string;
  id: string;
  imageSrc?: string;
}

const SpotifySectionItem: FC<SpootifySectionItemProps> = ({
  title,
  url,
  imageSrc,
  secondLine,
}) => (
  <a href={url} target="_blank">
    <li className="flex items-center justify-between gap-2 p-3 hover:bg-zinc-800 cursor-pointer rounded group">
      <div className="flex items-center gap-2 overflow-hidden">
        <img src={imageSrc} className="h-12 w-12 rounded bg-gray-500" />
        <div className="flex-grow max-w-[calc(100%-3.5rem)]">
          <h6 className="font-bold text-sm text-gray-100 truncate">{title}</h6>
          <p className="text-gray-300 text-xs truncate">{secondLine}</p>
        </div>
      </div>
      <ExternalLink className="text-gray-100 invisible group-hover:visible w-4 h-4 shrink-0" />
    </li>
  </a>
);

export default SpotifySectionItem;
