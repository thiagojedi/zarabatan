import { render } from "preact";
import { SWRConfig } from "swr";
import { getFetcher } from "./helpers/request";
import { BlockForm } from "./components/block-form";
import { BlockList } from "./components/block-list";

export function App() {
  return (
    <SWRConfig value={{ fetcher: getFetcher() }}>
      <h1>Zarabatan</h1>
      <p>Simple and efficient way to silence Mastodon instances</p>
      <hr />
      <BlockForm />
      <hr />
      <BlockList />
    </SWRConfig>
  );
}

render(<App />, document.getElementById("app"));
