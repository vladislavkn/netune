import generateCode from "./generateCode";

const openAuthorisationPage = async () => {
  const { codeVerifier, codeChallenge } = await generateCode();
  window.localStorage.setItem("codeVerifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: import.meta.env.VITE_SPOTIFY_APP_CLIENT_ID,
    scope: "user-read-private user-read-email",
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: import.meta.env.VITE_CALLBACK_URL,
  };

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

export default openAuthorisationPage;
