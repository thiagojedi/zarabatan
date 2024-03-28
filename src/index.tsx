import { render } from "preact";
import { SWRConfig } from "swr";
import { getFetcher } from "./helpers/request";
import { BlockForm } from "./components/block-form";
import { BlockList } from "./components/block-list";
import { LoginForm } from "./components/login-form";
import { BlockInfo } from "./components/block-info";
import { useAppConfig } from "./hooks";

import "./style.css";
import { Fragment } from "react";

export function App() {
  const { config } = useAppConfig();
  return (
    <SWRConfig value={{ fetcher: getFetcher(config) }}>
      <header>
        <h1>Zarabatan (beta*)</h1>
        <p>Simple and effective way to silence instances at distance</p>
      </header>
      <hr />

      <div class="grid">
        <main>
          <LoginForm />

          {config?.token && (
            <Fragment>
              <BlockForm />
              <BlockList />
            </Fragment>
          )}
        </main>
        <aside>
          <BlockInfo />
        </aside>
      </div>

      <footer>
        <span>Made With &lt;3 in Brazil.</span>
        <span>
          Source code:{" "}
          <a href="https://github.com/thiagojedi/zarabatan">Github</a>
        </span>
        <span>
          Contact:{" "}
          <a href="https://mastodon.com.br/@jedi">@jedi@mastodon.com.br</a>
        </span>
      </footer>
    </SWRConfig>
  );
}

render(<App />, document.getElementById("app")!);
