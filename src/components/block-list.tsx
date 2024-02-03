import { useDomainBlocks } from "../hooks";

export const BlockList = () => {
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
