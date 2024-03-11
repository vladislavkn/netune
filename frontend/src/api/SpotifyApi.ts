import axios, { AxiosInstance } from "axios";

class SpotifyApi {
  private spotifyHttpClient: AxiosInstance;

  constructor() {
    this.spotifyHttpClient = axios.create({
      baseURL: "https://api.spotify.com/v1",
    });

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) this.setAccessToken(accessToken);
  }

  private setAccessToken(accessToken: string) {
    this.spotifyHttpClient.defaults.headers.common["Authorization"] =
      "Bearer " + accessToken;
  }

  public async setupAccessTokenOnCallbackPage() {
    const authCode = this.getAuthCodeFromCurrentUrl();

    const response = await this.spotifyHttpClient.post("/token", {
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: import.meta.env.VITE_CALLBACK_URL,
      code_verifier: localStorage.getItem("codeVerifier"),
      client_id: import.meta.env.VITE_SPOTIFY_APP_CLIENT_ID,
    });

    this.setAccessToken(response.data.access_token);
    localStorage.setItem("accessToken", response.data.access_token);
  }

  private getAuthCodeFromCurrentUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    if (!authCode) throw Error("No auth code found");

    return authCode;
  }

  public logout() {
    delete this.spotifyHttpClient.defaults.headers.common["Authorization"];
    localStorage.removeItem("accessToken");
  }

  public isAuthorized() {
    return !!localStorage.getItem("accessToken");
  }

  public async fetchProfile() {
    const response = await this.spotifyHttpClient.get("/me");
    return response.data;
  }
}

const spotifyApi = new SpotifyApi();

export default spotifyApi;
