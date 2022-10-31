import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";
import {
  AppsTwoTone,
  KeyboardArrowDownTwoTone,
  Undo,
} from "@mui/icons-material";
import "./index.scss";
import Modal from "../Modal";
import { UNDO_THE_LAST_ACTION } from "../../actions";
import { ADD_BOARD } from "../../../board/actions";
import useModal from "../../hooks/useModal";

const NavBar = () => {
  setPrefix("board-id-");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useModal();
  const [boardTitle, setBoardTitle] = useState("");

  const onCloseModal = () => {
    onClose();
    setBoardTitle("");
  };

  const handleOnClickUndo = () => dispatch({ type: UNDO_THE_LAST_ACTION });

  const handleOnChange = (e) => setBoardTitle(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!boardTitle) return;
    const boardId = nextId();
    dispatch({
      type: ADD_BOARD,
      payload: {
        id: boardId,
        title: boardTitle,
        columns: [],
      },
    });
    setBoardTitle("");
    onClose();
  };

  useEffect(() => {
    if (isOpen) inputRef.current.focus();
  }, [isOpen]);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <AppsTwoTone />
        </li>
        <li>
          <Link to="/">
            <img
              src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif"
              alt="trello"
            />
          </Link>
        </li>
        <li>
          Workspaces <KeyboardArrowDownTwoTone />
        </li>
        <li>
          Recent <KeyboardArrowDownTwoTone />
        </li>
        <li>
          Starred <KeyboardArrowDownTwoTone />
        </li>
        <li>
          Templates <KeyboardArrowDownTwoTone />
        </li>
        <li className="navbar-create-board">
          <button type="button" onClick={onOpen}>
            Create
          </button>
          <Modal isOpen={isOpen} onClose={onCloseModal}>
            <form
              onSubmit={handleOnSubmit}
              className="navbar-create-board-form"
            >
              <input
                type="text"
                ref={inputRef}
                placeholder="Enter board title…"
                className="input-list-title"
                value={boardTitle}
                onChange={handleOnChange}
              />
              <button type="submit">Create</button>
            </form>
          </Modal>
        </li>
        <li>
          <button type="button" onClick={handleOnClickUndo}>
            <Undo />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
