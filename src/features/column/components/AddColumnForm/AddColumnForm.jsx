import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";
import CloseIcon from "@mui/icons-material/Close";
import "./AddColumnForm.scss";
import AddButton from "../../../commons/components/AddButton";
import { ADD_COLUMN } from "../../actions";

const AddColumnForm = () => {
  setPrefix("column-id-");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { id: boardId } = useParams();
  const [columnTitle, setColumnTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const sectionStyle = `${showAddForm ? "" : "hide"}`;
  const addButtonStyle = `${showAddForm ? "hide" : ""}`;

  const handleOnChange = (e) => setColumnTitle(e.target.value);

  const handleOnClick = () => setShowAddForm(true);

  const handleOnCloseButton = () => {
    setColumnTitle("");
    setShowAddForm(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (columnTitle.trim() === "") return;
    dispatch({
      type: ADD_COLUMN,
      payload: {
        boardId,
        column: {
          id: nextId(),
          title: columnTitle,
          cards: [],
        },
      },
    });
    setShowAddForm(false);
    setColumnTitle("");
  };

  useEffect(() => {
    if (showAddForm) inputRef.current.focus();
  }, [showAddForm]);

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

export default AddColumnForm;
