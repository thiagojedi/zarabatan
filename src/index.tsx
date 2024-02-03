import { render } from "preact";
import { useCallback } from "preact/hooks";
import useSWR, { SWRConfig } from "swr";
import { getFetcher } from "./request";
import useSWRMutation from "swr/mutation";

const useDomainBlocks = () =>
  useSWR<string[]>("/api/v1/domain_blocks", {
    fallbackData: [],
  });

async function newBlock(url, { arg }: { arg: FormData }) {
  const fetcher = getFetcher();

  await fetcher(url, "POST", arg);
}

const useNewBlockMutation = () =>
  useSWRMutation("/api/v1/domain_blocks", newBlock);

const BlockForm = () => {
  const { trigger } = useNewBlockMutation();
  return (
    <section>
      <h2>Add new Block:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          trigger(new FormData(e.currentTarget));
        }}
      >
        <input type="text" name="domain" />
        <input type="submit" value="Add Block" />
      </form>
    </section>
  );
};

const BlockList = () => {
  const { data } = useDomainBlocks();

  return (
    <section>
      <h2>Blocked Domains</h2>
      <ul>
        {data.map((domain) => (
          <li key={domain}>{domain}</li>
        ))}
      </ul>
    </section>
  );
};

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
