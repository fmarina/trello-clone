import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SORT_CARDS } from "../../card/actions";
import Column from "../../column";
import { SORT_COLUMNS } from "../../column/actions";
import AddColumnForm from "../../column/components/AddColumnForm/AddColumnForm";
import "./BoardDetail.scss";

const BoardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const { boards } = useSelector((state) => state.boardReducer);
  const board = boards.find((board) => board.id === boardId);

  useEffect(() => {
    if (!board) navigate(`/`);
  }, [board, navigate]);

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    // if there is no destination
    if (!destination) return;

    // if source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Dragging columns
    if (type === "column") {
      const newColumnsCopy = [...board.columns];
      const columnSelected = newColumnsCopy.splice(source.index, 1);
      newColumnsCopy.splice(destination.index, 0, ...columnSelected);
      dispatch({
        type: SORT_COLUMNS,
        payload: {
          boardId,
          columnsSorted: newColumnsCopy,
        },
      });
    }

    // Dragging cards

    if (type === "task") {
      // if dropped inside the same column
      if (source.droppableId === destination.droppableId) {
        const newColumnsCopy = [...board.columns];
        const columnsArr = newColumnsCopy.map((column) => {
          if (column.id === source.droppableId) {
            const cards = [...column.cards];
            const card = cards.splice(source.index, 1);
            cards.splice(destination.index, 0, ...card);
            return { ...column, cards };
          }
          return column;
        });
        dispatch({
          type: SORT_CARDS,
          payload: {
            boardId,
            columnsCardsSorted: columnsArr,
          },
        });
      }

      // if dropped in a different column
      if (source.droppableId !== destination.droppableId) {
        const newColumnsCopy = [...board.columns];
        const sourceColumn = newColumnsCopy.find(
          (column) => column.id === source.droppableId
        );
        const sourceCards = [...sourceColumn.cards];
        const cardSelected = sourceCards.splice(source.index, 1);

        const destinationColumn = newColumnsCopy.find(
          (column) => column.id === destination.droppableId
        );
        const destinationCards = [...destinationColumn.cards];
        destinationCards.splice(destination.index, 0, ...cardSelected);

        const columnsArr = newColumnsCopy.map((column) => {
          if (column.id === sourceColumn.id) {
            return { ...column, cards: sourceCards };
          }
          if (column.id === destinationColumn.id) {
            return { ...column, cards: destinationCards };
          }
          return column;
        });

        dispatch({
          type: SORT_CARDS,
          payload: {
            boardId,
            columnsCardsSorted: columnsArr,
          },
        });
      }
    }
  };

  const columnList = boards.length
    ? board.columns.map(({ id, title, cards }, index) => (
        <Column
          key={id}
          boardId={boardId}
          columnId={id}
          title={title}
          cards={cards}
          index={index}
        />
      ))
    : null;

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

export default BoardDetail;
