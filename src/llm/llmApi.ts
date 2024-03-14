import axios from "axios";
import { Track, Artist } from "../spotify/spotifyApi.types";

class LLMApi {
  public async fetchMusicTaste(
    tracks: Track[],
    artists: Artist[]
  ): Promise<string> {
    console.log("request taste");
    const response = await axios.post<string>(
      import.meta.env.VITE_BACKEND_API + "/taste",
      {
        tracks: tracks.map((track) => ({
          name: track.name,
          authors: track.artists.map((artist) => artist.name),
        })),
        authors: artists.map((artist) => ({
          name: artist.name,
          genres: artist.genres,
        })),
      }
    );

    return response.data;
  }
}

const llmApi = new LLMApi();

export default llmApi;
