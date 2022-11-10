import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";
import { AddColumnForm as AddColumnFormComponent} from './AddColumnForm'
import { ADD_COLUMN } from "../../actionsType";

const AddColumnForm = () => {
  setPrefix("column-id-");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { id: boardId } = useParams();
  const [columnTitle, setColumnTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

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
    <AddColumnFormComponent
      showAddForm={showAddForm}
      handleOnSubmit={handleOnSubmit}
      handleOnClick={handleOnClick}
      inputRef={inputRef}
      columnTitle={columnTitle}
      handleOnChange={handleOnChange}
      handleOnCloseButton={handleOnCloseButton}
    />
  );
};

export default AddColumnForm;
