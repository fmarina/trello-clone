export const ADD_CARD = "ADD_CARD"
export const UPDATE_CARD = "UPDATE_CARD"
export const DELETE_CARD = "DELETE_CARD"
export const SORT_CARDS = "SORT_CARDS"

export const sortCardsSameColumn = ({boardId, board, source, destination}) => {
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
  return ({
    type: SORT_CARDS,
    payload: {
      boardId,
      columnsCardsSorted: columnsArr,
    },
  });
}

export const sortCardsDifferentColumns = ({boardId, board, source, destination}) => {
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

  return({
    type: SORT_CARDS,
    payload: {
      boardId,
      columnsCardsSorted: columnsArr,
    },
  });
}