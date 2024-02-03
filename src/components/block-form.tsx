import { useNewBlockMutation } from "../hooks";

export const BlockForm = () => {
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
