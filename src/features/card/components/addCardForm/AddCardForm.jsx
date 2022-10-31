import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Close, MoreHoriz } from "@mui/icons-material";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";
import "./AddCardForm.scss";
import AddButton from "../../../commons/components/AddButton";
import { ADD_CARD } from "../../actions";

const AddCardForm = ({ boardId, columnId }) => {
  setPrefix("card-id-");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [cardTitle, setCardTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const sectionStyle = `${showAddForm ? "" : "hide"}`;
  const addButtonStyle = `${showAddForm ? "hide" : ""}`;

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
    <form className="add-card-form" onSubmit={handleOnSubmit}>
      <AddButton
        className={addButtonStyle}
        text="Add a card"
        handleOnClick={handleOnClick}
      />
      <section className={`add-card-form-content ${sectionStyle}`}>
        <label>
          <input
            type="textarea"
            ref={inputRef}
            placeholder="Enter a title for this card…"
            value={cardTitle}
            onChange={handleOnChange}
          />
        </label>
        <section>
          <div className="add-new-card-button-container">
            <button type="submit">Add card</button>
            <button
              type="button"
              className="close-button"
              onClick={handleOnCloseButton}
            >
              <Close />
            </button>
          </div>
          <MoreHoriz />
        </section>
      </section>
    </form>
  );
};

export default AddCardForm;
