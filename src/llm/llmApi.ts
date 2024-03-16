import axios from "axios";
import { Track, Artist } from "../spotify/spotifyApi.types";
import { UserMusicData } from "./llmApi.types";

class LLMApi {
  private readonly TIMEOUT = 300_000;

  public async fetchMusicTaste(
    tracks: Track[],
    artists: Artist[],
    force = false
  ): Promise<string> {
    let result: string | undefined;
    if (this.needUpdateField("review", force)) {
      const response = await axios.post<string | undefined>(
        import.meta.env.VITE_BACKEND_API + "/taste",
        this.transformUserMusicData(tracks, artists)
      );

      if (response.data) {
        localStorage.setItem("reviewUpdated", Date.now().toString());
        localStorage.setItem("review", response.data);
        result = response.data;
      }
    }

    result = result ?? localStorage.getItem("review")!;
    return result;
  }

  public async fetchSuggestions(
    tracks: Track[],
    artists: Artist[],
    force = false
  ): Promise<string[]> {
    let result: string[] | undefined;
    if (this.needUpdateField("suggestions", force)) {
      const response = await axios.post<string[] | undefined>(
        import.meta.env.VITE_BACKEND_API + "/suggestions",
        this.transformUserMusicData(tracks, artists)
      );

      if (response.data && response.data.length > 0) {
        localStorage.setItem("suggestionsUpdated", Date.now().toString());
        localStorage.setItem("suggestions", JSON.stringify(response.data));
        result = response.data;
      }
    }

    result =
      result ?? (JSON.parse(localStorage.getItem("suggestions")!) as string[]);
    return result;
  }

  private needUpdateField(fieldName: string, force: boolean) {
    const currentFieldValue = localStorage.getItem(fieldName);
    if (!currentFieldValue) return true;
    const fieldLastUpdatedString = localStorage.getItem(`${fieldName}Updated`);
    if (!fieldLastUpdatedString) return true;

    return force && this.getMSTillNextUpdate(fieldName) <= 0;
  }

  public getMSTillNextUpdate(fieldName: string) {
    const fieldLastUpdatedString = localStorage.getItem(`${fieldName}Updated`)!;
    return this.TIMEOUT - (Date.now() - parseInt(fieldLastUpdatedString));
  }

  private transformUserMusicData(
    tracks: Track[],
    artists: Artist[]
  ): UserMusicData {
    return {
      tracks: tracks.map((track) => ({
        name: track.name,
        authors: track.artists.map((artist) => artist.name),
      })),
      authors: artists.map((artist) => ({
        name: artist.name,
        genres: artist.genres,
      })),
    };
  }
}

const llmApi = new LLMApi();

export default llmApi;
