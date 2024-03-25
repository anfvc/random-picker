import { useContext } from "react";
import { RandomContext } from "../Contexts/RandomContext";
import Item from "./Item";

function ItemList() {
  const { state } = useContext(RandomContext);

  return (
    <div className="items-container">
      {state.itemsArray.map((obj) => (
        <Item key={obj.id} obj={obj} />
      ))}
    </div>
  );
}

export default ItemList;
