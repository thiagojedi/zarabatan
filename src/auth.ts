const callback_url = import.meta.env.VITE_OAUTH_CALLBACK;

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
      client_name: "SaberTooth",
      redirect_uris: callback_url,
      scopes: "read write",
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
  authorizeUrl.searchParams.append("scope", "read write");
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
  const {
    server,
    token,
    clientId: client_id,
    clientSecret: client_secret,
  } = getAuthInfo();

  if (server) {
    await fetch(`https://${server}/oauth/revoke`, {
      method: "POST",
      body: new URLSearchParams({ client_id, client_secret, token }),
    }).catch((e) => console.error(e));
  }

  localStorage.clear();
};
