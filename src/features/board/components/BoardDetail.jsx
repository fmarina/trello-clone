import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./BoardDetail.scss";
import AddColumnForm from "../../column/components/AddColumnForm/AddColumnForm";

const BoardDetail = ({ columnList, onDragEnd }) => {
  return (
    <main className="board-detail-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {columnList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <section className="board-add-column-form-container">
        <AddColumnForm />
      </section>
    </main>
  );
};

export { BoardDetail };
