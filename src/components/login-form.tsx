import { useEffect, useState } from "preact/hooks";
import { authApp, getToken, logout } from "../helpers/auth";
import { useAppConfig } from "../hooks";

export const LoginForm = () => {
  const { config, refreshConfig } = useAppConfig();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code)
      getToken(code).then(() => {
        window.location.search = "";
        refreshConfig();
      });
  }, []);

  const [server, setServer] = useState("");

  if (config?.server) {
    return (
      <p>
        Please, remember to logout before leaving this page:{" "}
        <button
          onClick={async () => {
            await logout();
            await refreshConfig();
          }}
        >
          Logout
        </button>
      </p>
    );
  }
  return (
    <p>
      <h2>Tell us your instance</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          authApp(server);
        }}
      >
        <input
          type="text"
          placeholder="i.e. example.com"
          value={server}
          onChange={(e) => setServer(e.currentTarget.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </p>
  );
};
