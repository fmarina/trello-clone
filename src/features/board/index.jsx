import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";

const Board = () => {
  const { boards } = useSelector((state) => state.boardReducer);

  const boardList = boards.length ? (
    boards.map(({ id, title }) => (
      <li key={id}>
        <Link to={`/${id}`}>{title}</Link>
      </li>
    ))
  ) : (
    <p>No board created</p>
  );

  return (
    <main className="board-container">
      <h1>BOARDS</h1>
      <ul>{boardList}</ul>
    </main>
  );
};

export default Board;
