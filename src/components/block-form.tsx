import { useNewBlockMutation } from "../hooks";
import { useState } from "preact/hooks";
import { FC } from "react";

export const BlockForm: FC<{ disabled?: boolean }> = ({ disabled }) => {
  const { trigger } = useNewBlockMutation();
  const [value, setValue] = useState<string>();
  return (
    <section style={{ gridArea: "form" }}>
      <h2>Add new Block:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          trigger(new FormData(e.currentTarget)).then(() => setValue(""));
        }}
      >
        <label for="domain">
          Any domain, doest not need to be a Mastodon instance or even exist
          yet.
        </label>
        <input
          disabled={disabled}
          type="text"
          name="domain"
          inputMode="url"
          required
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />

        <input type="submit" value="Add Block" disabled={disabled} />
      </form>
    </section>
  );
};
