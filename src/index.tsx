import { render } from "preact";
import { SWRConfig } from "swr";
import { getFetcher } from "./helpers/request";
import { BlockForm } from "./components/block-form";
import { BlockList } from "./components/block-list";
import { LoginForm } from "./components/login-form";
import { useAppConfig } from "./hooks";

import "./style.css";

export function App() {
  const { config } = useAppConfig();
  return (
    <SWRConfig value={{ fetcher: getFetcher(config) }}>
      <header>
        <h1>Zarabatan (beta)</h1>
        <p>
          Simple and effective way to silence Mastodon instances at distance
        </p>
      </header>
      <hr />
      <aside>
        <LoginForm />
      </aside>
      {config?.token && (
        <main>
          <BlockForm />

          <BlockList />
        </main>
      )}
    </SWRConfig>
  );
}

render(<App />, document.getElementById("app")!);
