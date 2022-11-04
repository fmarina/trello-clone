export const ADD_COLUMN = "ADD_COLUMN"
export const UPDATE_COLUMN = "UPDATE_COLUMN"
export const DELETE_COLUMN = "DELETE_COLUMN"
export const SORT_COLUMNS = "SORT_COLUMNS"

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