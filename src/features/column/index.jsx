import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import "./index.scss";
import Card from "../card";
import AddCardForm from "../card/components/addCardForm";
import { DELETE_COLUMN, UPDATE_COLUMN } from "./actions";

const Column = ({ boardId, columnId, title, cards, index }) => {
  const dispatch = useDispatch();
  const [columnTitle, setColumnTitle] = useState(title);

  const handleOnChange = (e) => {
    setColumnTitle(e.target.value);
    dispatch({
      type: UPDATE_COLUMN,
      payload: {
        boardId,
        column: {
          id: columnId,
          title: e.target.value,
        },
      },
    });
  };

  const handleOnClick = () => {
    dispatch({
      type: DELETE_COLUMN,
      payload: {
        boardId,
        columnId,
      },
    });
  };

  const listCards = cards.map(({ id, text }, indexCard) => (
    <Card
      key={id}
      boardId={boardId}
      columnId={columnId}
      id={id}
      cardText={text}
      index={indexCard}
    />
  ));

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="column-wrapper"
        >
          <section className="column-content">
            <header>
              <input
                type="textarea"
                className="column-textarea"
                value={columnTitle}
                onChange={handleOnChange}
              />
              <button
                type="button"
                className="delete-column-button"
                onClick={handleOnClick}
              >
                <DeleteOutlineOutlined />
              </button>
            </header>
            <section className="list-card-container">
              <Droppable droppableId={columnId} type="task">
                {(provided) => (
                  <ul
                    className="list-card-content"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {listCards}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </section>

            <section className="column-add-card-form-container">
              <AddCardForm boardId={boardId} columnId={columnId} />
            </section>
          </section>
        </article>
      )}
    </Draggable>
  );
};

export default Column;
