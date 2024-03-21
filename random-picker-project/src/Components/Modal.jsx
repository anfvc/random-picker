import { useState } from "react";
import Popup from "reactjs-popup";

function Modal() {

  const [error, setError] = useState({ content: "", open: false });
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
