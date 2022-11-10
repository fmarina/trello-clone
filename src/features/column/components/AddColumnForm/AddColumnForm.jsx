import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./AddColumnForm.scss";
import AddButton from "../../../commons/components/AddButton";

const AddColumnForm = ({
  showAddForm,
  handleOnSubmit,
  handleOnClick,
  inputRef,
  columnTitle,
  handleOnChange,
  handleOnCloseButton,
}) => {
  const sectionStyle = `${showAddForm ? "" : "hide"}`;
  const addButtonStyle = `${showAddForm ? "hide" : ""}`;

  return (
    <form className="add-column-form" onSubmit={handleOnSubmit}>
      <AddButton
        className={addButtonStyle}
        text="Add List"
        handleOnClick={handleOnClick}
      />
      <section className={`add-column-form-content ${sectionStyle}`}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter list title…"
          className="input-list-title"
          value={columnTitle}
          onChange={handleOnChange}
        />
        <section>
          <button type="submit">Add List</button>
          <button
            type="button"
            className="close-button"
            onClick={handleOnCloseButton}
          >
            <CloseIcon />
          </button>
        </section>
      </section>
    </form>
  );
};

export { AddColumnForm };
