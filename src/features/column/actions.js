import { SORT_COLUMNS } from "./actionsType";

export const sortColumns = ({ boardId, board, source, destination }) => {
  const newColumnsCopy = [...board.columns];
  const columnSelected = newColumnsCopy.splice(source.index, 1);
  newColumnsCopy.splice(destination.index, 0, ...columnSelected);
  return ({
    type: SORT_COLUMNS,
    payload: {
      boardId,
      columnsSorted: newColumnsCopy,
    },
  });
}