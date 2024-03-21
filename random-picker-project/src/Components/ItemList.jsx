function ItemList({ dispatch, input, setInput, state }) {
  const { itemsArray } = state;

  return (
    <ul>
      {itemsArray.map((obj) => {
        return (
          <div key={obj.id}>
            <li>{obj.item}</li>

            <button onClick={() => dispatch({ type: "DELETE", payload: obj.id })}>
              X
            </button>
          </div>
        );
      })}
    </ul>
  );
}

export default ItemList;
