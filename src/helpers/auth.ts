const callback_url = import.meta.env.VITE_OAUTH_CALLBACK;
const applicationScopes = "read:blocks write:blocks";
const applicationName = "Zarabatan";

export const getAuthInfo = () => ({
  server:
    (import.meta.env.VITE_SERVER as string) ??
    localStorage.getItem("instance_server"),
  token:
    (import.meta.env.VITE_TOKEN as string) ?? localStorage.getItem("zb_token")!,
  clientId: localStorage.getItem("zb_client_id")!,
  clientSecret: localStorage.getItem("zb_client_secret")!,
});
export const authApp = async (server: string) => {
  localStorage.setItem("instance_server", server);

  const response = await fetch(`https://${server}/api/v1/apps`, {
    method: "POST",
    body: new URLSearchParams({
      client_name: applicationName,
      redirect_uris: callback_url,
      scopes: applicationScopes,
      website: "https://github.com/thiagojedi/sabertooth/",
    }),
  });

  if (response.ok) {
    const { client_id, client_secret } = await response.json();

    localStorage.setItem("zb_client_id", client_id);
    localStorage.setItem("zb_client_secret", client_secret);

    authorizeApp(server, client_id);
  }
};
export const authorizeApp = (server: string, client_id: string) => {
  const authorizeUrl = new URL(`https://${server}/oauth/authorize`);
  authorizeUrl.searchParams.append("response_type", "code");
  authorizeUrl.searchParams.append("client_id", client_id);
  authorizeUrl.searchParams.append("redirect_uri", callback_url);
  authorizeUrl.searchParams.append("scope", applicationScopes);
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
    localStorage.setItem("zb_token", access_token);
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
