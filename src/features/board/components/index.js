import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BoardDetail as BoardDetailComponent } from './BoardDetail'
import Column from "../../column";
import {
  sortCardsDifferentColumns,
  sortCardsSameColumn,
} from "../../card/actions";
import { sortColumns } from "../../column/actions";

const BoardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const { boards } = useSelector((state) => state.boardReducer);
  const board = boards.find((board) => board.id === boardId);

  useEffect(() => {
    if (!board) navigate(`/`);
  }, [board, navigate]);

  const columnList = boards?.length
    ? board?.columns.map(({ id, title, cards }, index) => (
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

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    // if there is no destination
    if (!destination) return;

    // if source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const sortProps = { boardId, board, source, destination }

    // Dragging columns
    if (type === "column") dispatch(sortColumns({...sortProps}));

    // Dragging cards
    if (type === "task") {

      // if dropped inside the same column
      if (source.droppableId === destination.droppableId) {
        dispatch(sortCardsSameColumn({...sortProps}));
      }

      // if dropped in a different column
      if (source.droppableId !== destination.droppableId) {
        dispatch(sortCardsDifferentColumns({...sortProps}));
      }
    }
  };

  return (
    <BoardDetailComponent columnList={columnList} onDragEnd={onDragEnd} />
  );
};

export default BoardDetail;
