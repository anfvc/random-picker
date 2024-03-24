import { useContext } from "react";
import { RandomContext } from "../Contexts/RandomContext";

function Form() {
  const { handleSubmit, handleChange, state } = useContext(RandomContext);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={state.input}
        placeholder="Add an item here!"
      />
      <button type="submit">ADD</button>
    </form>
  );
}

export default Form;
