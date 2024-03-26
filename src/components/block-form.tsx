import { useNewBlockMutation } from "../hooks";
import { useState } from "preact/hooks";

export const BlockForm = () => {
  const { trigger } = useNewBlockMutation();
  const [value, setValue] = useState<string>();
  return (
    <section>
      <h2>Add new Block:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          trigger(new FormData(e.currentTarget)).then(() => setValue(""));
        }}
      >
        <input
          type="text"
          name="domain"
          required
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <input type="submit" value="Add Block" />
      </form>
    </section>
  );
};
