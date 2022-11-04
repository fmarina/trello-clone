import React from "react";
import { Close, MoreHoriz } from "@mui/icons-material";
import "./AddCardForm.scss";
import AddButton from "../../../commons/components/AddButton";

const AddCardForm = ({
  handleOnSubmit,
  handleOnClick,
  showAddForm,
  inputRef,
  cardTitle,
  handleOnChange,
  handleOnCloseButton,
}) => {
  const sectionStyle = `${showAddForm ? "" : "hide"}`;
  const addButtonStyle = `${showAddForm ? "hide" : ""}`;

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

export { AddCardForm };
