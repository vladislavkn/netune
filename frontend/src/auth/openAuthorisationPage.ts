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

const generateCode = async () => {
  const codeVerifier = generateRandomString(128);
  const hashed = await sha256Encode(codeVerifier);
  const codeChallenge = base64encode(hashed);

  return { codeChallenge, codeVerifier };
};

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256Encode = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export default openAuthorisationPage;
