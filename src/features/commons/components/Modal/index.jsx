import React from "react";
import { Clear } from "@mui/icons-material";
import "./index.scss";

const Modal = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="modal-container">
      <article>
        <div>
          <button type="button" onClick={onClose}>
            <Clear />
          </button>
        </div>
        <main>{children}</main>
      </article>
    </div>
  ) : null;
};

export default Modal;
