import { useEffect, useContext } from "react";
import ItemList from "./ItemList";
import Modal from "./Modal";
import { RandomContext } from "../Contexts/RandomContext";
import Form from "./Form";

function RandomPicker() {
  const { error, state, handlePlay, dispatch } = useContext(RandomContext);

  useEffect(() => {
    if (state.isPlaying) {
      const interval = setInterval(() => {
        dispatch({ type: "PICK" });
        dispatch({ type: "PICK_GIF" });
      }, 60);

      setTimeout(() => {
        clearInterval(interval);
        dispatch({ type: "PLAY" });
      }, 2000);
    }
  }, [state.isPlaying]);

  console.log(state);

  //useEffect to send our items to localStorage

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(state.itemsArray));
  }, [state.itemsArray]);

  return (
    <div className="container">
      <h2>
        {state.pickedItem.item
          ? state.pickedItem.item
          : "Add Items and Pick One"}
      </h2>

      <Form />
      <div className="btn-container">
        <button
          onClick={handlePlay}
          className="add-btn"
          disabled={state.isPlaying}
        >
          PLAY
        </button>
        <button onClick={() => dispatch({ type: "RELOAD" })}>RESET</button>
      </div>
      <ItemList />

      <div>{state.pickGif ? <img src={state.pickGif} alt="" /> : ""}</div>
      {state.error && <Modal />}
    </div>
  );
}

export default RandomPicker;
