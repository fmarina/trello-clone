import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";
import { NavBar as NavBarComponent } from './NavBar'
import { UNDO_THE_LAST_ACTION } from "../../actions";
import { ADD_BOARD } from "../../../board/actions";
import useModal from "../../hooks/useModal";

const NavBar = () => {
  setPrefix("board-id-");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [boardTitle, setBoardTitle] = useState("");
  const { isOpen, onClose, onOpen } = useModal();

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
    <NavBarComponent
      modalIsOpen={isOpen}
      onOpenModal={onOpen}
      onCloseModal={onCloseModal}
      onSubmit={handleOnSubmit}
      inputRef={inputRef}
      boardTitle={boardTitle}
      onChange={handleOnChange}
      handleOnClickUndo={handleOnClickUndo}
    />
  );
};

export default NavBar;
