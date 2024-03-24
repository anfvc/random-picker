import { useContext } from "react";
import { RandomContext } from "../Contexts/RandomContext";

function Item({ obj }) {
  const { dispatch } = useContext(RandomContext);
  return (
    <div>
      <p>{obj.item}</p>
      <button onClick={() => dispatch({ type: "DELETE", payload: obj.id })}>
        X
      </button>
    </div>
  );
}

export default Item;
