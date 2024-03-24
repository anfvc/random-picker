import { useContext, useState } from "react";
import Popup from "reactjs-popup";
import { RandomContext } from "../Contexts/RandomContext";

function Modal() {

  const {error, setError} = useContext(RandomContext)
  const closeModal = () =>  setError({open: false, content: ""})


  return (
    <Popup open={error.open} closeOnDocumentClick onClose={closeModal}>
      <div className="modal">
        {error.content}
        <button className="close" onClick={closeModal}>X</button>
      </div>
    </Popup>
  );
}

export default Modal;
