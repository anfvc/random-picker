import { useContext } from "react";
import Popup from "reactjs-popup";
import { RandomContext } from "../Contexts/RandomContext";

function Modal() {
  const { state, dispatch } = useContext(RandomContext);
  const closeModal = () =>
    dispatch({ type: "ERROR", payload: { open: false, content: "" } });

  return (
    <Popup open={state.error.open} closeOnDocumentClick onClose={closeModal}>
      <div className="modal">
        {state.error.content}
        <button className="close" onClick={closeModal}>
          X
        </button>
      </div>
    </Popup>
  );
}

export default Modal;
