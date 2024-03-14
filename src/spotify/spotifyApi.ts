import axios, { AxiosError, AxiosInstance } from "axios";
import queryClient from "../lib/tanstack-query";
import { Artist, Track } from "./spotifyApi.types";

class SpotifyApi {
  private spotifyHttpClient: AxiosInstance;

  constructor() {
    this.spotifyHttpClient = axios.create({
      baseURL: "https://api.spotify.com/v1",
    });

    this.spotifyHttpClient.interceptors.response.use(
      null,
      (error: AxiosError) => {
        if (error.response?.status === 401) this.logout();
      }
    );

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) this.setAccessToken(accessToken);
  }

  private setAccessToken(accessToken: string) {
    this.spotifyHttpClient.defaults.headers.common["Authorization"] =
      "Bearer " + accessToken;
  }

  public async setupAccessTokenOnCallbackPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    if (!authCode) throw Error("No auth code found");

    const codeVerifier = localStorage.getItem("codeVerifier");
    if (!codeVerifier) throw Error("No code verifier found.");

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: import.meta.env.VITE_CALLBACK_URL,
        code_verifier: codeVerifier,
        client_id: import.meta.env.VITE_SPOTIFY_APP_CLIENT_ID,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    this.setAccessToken(response.data.access_token);
    localStorage.setItem("accessToken", response.data.access_token);
  }

  public logout() {
    delete this.spotifyHttpClient.defaults.headers.common["Authorization"];
    localStorage.removeItem("accessToken");
    queryClient.refetchQueries({ queryKey: ["profile"] });
  }

  public isAuthorized() {
    return !!localStorage.getItem("accessToken");
  }

  public async fetchProfile() {
    const response = await this.spotifyHttpClient.get("/me");
    return response.data;
  }

  public async fetchTop<T extends "artists" | "tracks">(
    type: T
  ): Promise<Array<T extends "artists" ? Artist : Track>> {
    const response = await this.spotifyHttpClient.get(`/me/top/${type}`, {
      params: { limit: 12 },
    });
    return response.data.items;
  }
}

const spotifyApi = new SpotifyApi();

export default spotifyApi;
