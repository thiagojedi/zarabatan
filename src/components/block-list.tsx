import { useDomainBlocks, useRemoveBlockMutation } from "../hooks";

export const BlockList = () => {
  const { data } = useDomainBlocks();

  const { trigger } = useRemoveBlockMutation();

  if (!data?.length) {
    return null;
  }

  return (
    <section>
      <h2>Blocked Domains</h2>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((domain) => (
            <tr key={domain}>
              <td>{domain}</td>
              <td>
                <button onClick={() => trigger(domain)}>Unblock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
