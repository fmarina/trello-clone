import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";
import { AddCardForm as AddCardFormComponent } from './AddCardForm'
import { ADD_CARD } from "../../actionsTypes";

const AddCardForm = ({ boardId, columnId }) => {
  setPrefix("card-id-");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [cardTitle, setCardTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleOnChange = (e) => setCardTitle(e.target.value);

  const handleOnClick = () => setShowAddForm(true);

  const handleOnCloseButton = () => {
    setCardTitle("");
    setShowAddForm(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (cardTitle.trim() === "") return;
    dispatch({
      type: ADD_CARD,
      payload: {
        boardId,
        columnId,
        card: {
          id: nextId(),
          text: cardTitle,
        },
      },
    });
    setShowAddForm(false);
    setCardTitle("");
  };

  useEffect(() => {
    if (showAddForm) inputRef.current.focus();
  }, [showAddForm]);

  return (
    <AddCardFormComponent
      handleOnSubmit={handleOnSubmit}
      handleOnClick={handleOnClick}
      showAddForm={showAddForm}
      inputRef={inputRef}
      cardTitle={cardTitle}
      handleOnChange={handleOnChange}
      handleOnCloseButton={handleOnCloseButton}
    />
  );
};

export default AddCardForm;
