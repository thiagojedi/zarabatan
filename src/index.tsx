import { Fragment, render } from "preact";
import { SWRConfig } from "swr";
import { getFetcher } from "./helpers/request";
import { BlockForm } from "./components/block-form";
import { BlockList } from "./components/block-list";
import { LoginForm } from "./components/login-form";
import { useAppConfig } from "./hooks";

export function App() {
  const { config } = useAppConfig();
  return (
    <SWRConfig value={{ fetcher: getFetcher(config) }}>
      <h1>Zarabatan (beta)</h1>
      <p>Simple and effective way to silence Mastodon instances at distance</p>
      <hr />
      <LoginForm />
      {config?.token && (
        <Fragment>
          <hr />
          <BlockForm />
          <hr />
          <BlockList />
        </Fragment>
      )}
    </SWRConfig>
  );
}

render(<App />, document.getElementById("app")!);
