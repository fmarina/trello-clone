import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { EditOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import "./index.scss";
import { DELETE_CARD, UPDATE_CARD } from "./actions";
import useModal from "../commons/hooks/useModal";
import Modal from "../commons/components/Modal";
import {} from "react-redux";

const Card = ({ boardId, columnId, id, cardText, index }) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useModal();
  const [cardTitle, setCardTitle] = useState(cardText);

  const handleOnClickDelete = () => {
    dispatch({
      type: DELETE_CARD,
      payload: { boardId, columnId, cardId: id },
    });
  };

  const handleOnChange = (e) => setCardTitle(e.target.value);

  const handleOnClose = () => {
    onClose();
    setCardTitle(cardText);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!cardTitle) return;
    dispatch({
      type: UPDATE_CARD,
      payload: {
        boardId,
        columnId,
        card: {
          id,
          text: cardTitle,
        },
      },
    });
    onClose();
  };

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
          <Modal isOpen={isOpen} onClose={handleOnClose}>
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
              <EditOutlined onClick={onOpen} />
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

export default Card;
