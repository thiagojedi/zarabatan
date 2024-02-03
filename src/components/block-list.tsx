import { useDomainBlocks, useRemoveBlockMutation } from "../hooks";

export const BlockList = () => {
  const { data } = useDomainBlocks();

  const { trigger } = useRemoveBlockMutation();

  return (
    <section>
      <h2>Blocked Domains</h2>
      <ul>
        {data.map((domain) => (
          <li key={domain}>
            {domain}
            <button onClick={() => trigger(domain)}>Unblock</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
