import { useContext } from "react";
import { RandomContext } from "../Contexts/RandomContext";
import Item from "./Item";

function ItemList() {
  const { state, dispatch } = useContext(RandomContext);

  return (
    <div>
      {state.itemsArray.map((obj) => (
        <Item key={obj.id} obj={obj} />
      ))}
    </div>
  );
}

export default ItemList;
