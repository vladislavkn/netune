import { toast } from "sonner";

const share = async (title: string, text: string) => {
  try {
    if (navigator.share) {
      await navigator.share({ title, text });
    } else {
      await navigator.clipboard.writeText(`${title}\n${text}`);
      toast("Can't share, so copied to clipboard!");
    }
  } catch {
    toast("Can't share, copy by yourself, please :-(");
  }
};

export default share;
