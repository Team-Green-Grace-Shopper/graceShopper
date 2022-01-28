import React from "react";
import "./Modal.css";

const Modal = () => {
  return (
    <div className="modal">
      <div className="backdrop"></div>
      <div className="window">
        <h3>Modal Title</h3>
        <p>Modal content goes here</p>
      </div>
    </div>
  );
};

export default Modal;
