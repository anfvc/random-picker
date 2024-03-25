/* eslint-disable react/prop-types */
import { useContext } from "react";
import { RandomContext } from "../Contexts/RandomContext";

function Item({ obj }) {
  const { dispatch } = useContext(RandomContext);
  return (
    <div className="item-container">
      <p>{obj.item}</p>
      <button
        className="delete-button"
        onClick={() => dispatch({ type: "DELETE", payload: obj.id })}
      >
        ❌
      </button>
    </div>
  );
}

export default Item;
