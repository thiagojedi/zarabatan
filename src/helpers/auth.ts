const applicationName = "Zarabatan";

const callback_url = import.meta.env.VITE_OAUTH_CALLBACK;
const scopes = "read:blocks write:blocks";
const serverKey = "zb_server";
const tokenKey = "zb_token";
const clientKey = "zb_client_id";
const secretKey = "zb_client_secret";

export const getAuthInfo = () => ({
  server:
    (import.meta.env.VITE_SERVER as string) ?? localStorage.getItem(serverKey),
  token:
    (import.meta.env.VITE_TOKEN as string) ?? localStorage.getItem(tokenKey)!,
  clientId: localStorage.getItem(clientKey)!,
  clientSecret: localStorage.getItem(secretKey)!,
});
export const authApp = async (server: string) => {
  localStorage.setItem(serverKey, server);

  const response = await fetch(`https://${server}/api/v1/apps`, {
    method: "POST",
    body: new URLSearchParams({
      client_name: applicationName,
      redirect_uris: callback_url,
      scopes: scopes,
      website: "https://github.com/thiagojedi/sabertooth/",
    }),
  });

  if (response.ok) {
    const { client_id, client_secret } = await response.json();

    localStorage.setItem(clientKey, client_id);
    localStorage.setItem(secretKey, client_secret);

    authorizeApp(server, client_id);
  }
};
export const authorizeApp = (server: string, client_id: string) => {
  const authorizeUrl = new URL(`https://${server}/oauth/authorize`);
  authorizeUrl.searchParams.append("response_type", "code");
  authorizeUrl.searchParams.append("client_id", client_id);
  authorizeUrl.searchParams.append("redirect_uri", callback_url);
  authorizeUrl.searchParams.append("scope", scopes);
  window.location.href = authorizeUrl.toString();
};
export const getToken = async (code: string) => {
  const { server, clientId, clientSecret } = getAuthInfo();

  const request = await fetch(`https://${server}/oauth/token`, {
    method: "POST",
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: callback_url,
    }),
  });

  if (request.ok) {
    const { access_token } = await request.json();
    localStorage.setItem(tokenKey, access_token);
  }
};
export const logout = async () => {
  const { server, token, clientId, clientSecret } = getAuthInfo();

  if (server) {
    const formData = new FormData();
    formData.set("client_id", clientId);
    formData.set("client_secret", clientSecret);
    formData.set("token", token);
    await fetch(`https://${server}/oauth/revoke`, {
      method: "POST",
      body: formData,
    }).catch((e) => console.error(e));
  }

  localStorage.clear();
};
