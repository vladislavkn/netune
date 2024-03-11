const getAccessToken = async (authCode: string) => {
  let codeVerifier = localStorage.getItem("codeVerifier");

  const body = await fetch("https://accounts.spotify.com/api/token/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_APP_CLIENT_ID,
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: import.meta.env.VITE_CALLBACK_URL,
      code_verifier: codeVerifier as string,
    }),
  });

  if (!body.ok) {
    throw new Error("Failed to get access token");
  }

  const response = await body.json();

  return response.access_token;
};

export default getAccessToken;
