import axios from "axios";
import { Track, Artist } from "../spotify/spotifyApi.types";
import { UserMusicData } from "./llmApi.types";

class LLMApi {
  public async fetchMusicTaste(
    tracks: Track[],
    artists: Artist[]
  ): Promise<string> {
    const savedReview = localStorage.getItem("review");
    if (savedReview) return savedReview;

    const response = await axios.post<string>(
      import.meta.env.VITE_BACKEND_API + "/taste",
      this.transformUserMusicData(tracks, artists)
    );

    localStorage.setItem("review", response.data);
    return response.data;
  }

  public async fetchSuggestions(
    tracks: Track[],
    artists: Artist[]
  ): Promise<string[]> {
    const savedSuggestions = localStorage.getItem("suggestions");
    if (savedSuggestions) return JSON.parse(savedSuggestions);

    const response = await axios.post<string[]>(
      import.meta.env.VITE_BACKEND_API + "/suggestions",
      this.transformUserMusicData(tracks, artists)
    );

    localStorage.setItem("suggestions", JSON.stringify(response.data));
    return response.data;
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
