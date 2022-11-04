import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import "./Card.scss";
import Modal from "../commons/components/Modal";

const Card = ({
  id,
  index,
  cardTitle,
  modalIsOpen,
  modalOnOpen,
  modalOnClose,
  handleOnSubmit,
  handleOnChange,
  handleOnClickDelete,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className="list-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{cardTitle}</p>
          <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
            <form className="card-edit-form" onSubmit={handleOnSubmit}>
              <input
                type="textarea"
                value={cardTitle}
                onChange={handleOnChange}
              />
              <button type="submit">Edit</button>
            </form>
          </Modal>
          <div>
            <span>
              <EditOutlined onClick={modalOnOpen} />
            </span>
            <span>
              <DeleteOutlineOutlined onClick={handleOnClickDelete} />
            </span>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export { Card };
