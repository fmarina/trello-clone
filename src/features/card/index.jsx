import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card as CardComponent } from "./Card";
import { DELETE_CARD, UPDATE_CARD } from "./actionsTypes";
import useModal from "../commons/hooks/useModal";

const Card = ({ boardId, columnId, id, cardText, index }) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState(cardText);
  const { isOpen, onClose, onOpen } = useModal();

  const handleOnChange = (e) => setCardTitle(e.target.value);

  const handleOnClickDelete = () => {
    dispatch({
      type: DELETE_CARD,
      payload: { boardId, columnId, cardId: id },
    });
  };

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
    <CardComponent
      id={id}
      index={index}
      cardTitle={cardTitle}
      modalIsOpen={isOpen}
      modalOnOpen={onOpen}
      modalOnClose={handleOnClose}
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleOnChange}
      handleOnClickDelete={handleOnClickDelete}
    />
  );
};

export default Card;
