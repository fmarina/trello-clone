import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BoardDetail as BoardDetailComponent } from './BoardDetail'
import {
  sortCardsDifferentColumns,
  sortCardsSameColumn,
} from "../../card/actions";
import { sortColumns } from "../../column/actions";
import { COLUMN, TASK } from "../constants";

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
    ) return;

    const sortProps = { boardId, board, source, destination }

    // Dragging columns
    if (type === COLUMN) dispatch(sortColumns({...sortProps}));

    // Dragging cards
    if (type === TASK) {

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
    <BoardDetailComponent board={board} onDragEnd={onDragEnd} />
  );
};

export default BoardDetail;
