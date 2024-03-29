import { toast } from "sonner";

const share = async (title: string, text: string) => {
  text = `${title}\n${text}`;
  try {
    if (navigator.canShare({ title, text, url: location.href })) {
      await navigator.share({ title, text, url: location.href });
    } else {
      await navigator.clipboard.writeText(text);
      toast("Can't share, so copied to clipboard!");
    }
  } catch {
    toast("Can't share, copy by yourself, please :-(");
  }
};

export default share;
