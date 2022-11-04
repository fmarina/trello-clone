import React from "react";
import { Link } from "react-router-dom";
import {
  AppsTwoTone,
  KeyboardArrowDownTwoTone,
  Undo,
} from "@mui/icons-material";
import "./NavBar.scss";
import Modal from "../Modal";

const NavBar = ({
  modalIsOpen,
  onOpenModal,
  onCloseModal,
  onSubmit,
  inputRef,
  boardTitle,
  onChange,
  handleOnClickUndo,
}) => {
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
          <button type="button" onClick={onOpenModal}>
            Create
          </button>
          <Modal isOpen={modalIsOpen} onClose={onCloseModal}>
            <form onSubmit={onSubmit} className="navbar-create-board-form">
              <input
                type="text"
                ref={inputRef}
                placeholder="Enter board title…"
                className="input-list-title"
                value={boardTitle}
                onChange={onChange}
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

export { NavBar };
