import { ADD_BOARD, DELETE_BOARD } from '../board/actions'
import { ADD_COLUMN, DELETE_COLUMN, SORT_COLUMNS, UPDATE_COLUMN } from '../column/actionsType'
import { ADD_CARD, DELETE_CARD, SORT_CARDS, UPDATE_CARD } from '../card/actionsTypes'
import { UNDO_THE_LAST_ACTION } from './actions'

const initialState = {
  boards: [],
  boardsBeforeLastAction: []
}

export const boardReducer = (state = initialState, action) => {
  const boardsCopy = state.boards
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload)
      }
    case ADD_COLUMN:
      return {
        ...state,
        boardsBeforeLastAction: boardsCopy,
        boards: state.boards.map(board => {
          return board.id === action.payload.boardId
          ? {
            ...board,
            columns: [...board.columns, action.payload.column]
          } : board
        })
      }
    case DELETE_COLUMN:
      return {
        ...state,
        boardsBeforeLastAction: boardsCopy,
        boards: state.boards.map(board => {
          return board.id === action.payload.boardId
            ? {
              ...board,
              columns: board.columns.filter(column => column.id !== action.payload.columnId)
            } : board
        })
      }
    case UPDATE_COLUMN:
      return {
        ...state,
        boardsBeforeLastAction: boardsCopy,
        boards: state.boards.map(board => {
          return board.id === action.payload.boardId
            ? {
              ...board,
              columns: board.columns.map(column => {
                if (column.id === action.payload.column.id) {
                  return {
                    ...column,
                    title: action.payload.column.title
                  }
                }
                return column
              })
            } : board
        })
      }
    
    case ADD_CARD:
      return {
        ...state,
        boardsBeforeLastAction: boardsCopy,
        boards: state.boards.map(board => {
          return board.id === action.payload.boardId
            ? {
              ...board,
              columns: board.columns.map(column => {
                if (column.id === action.payload.columnId) {
                  return {
                    ...column,
                    cards: [...column.cards, action.payload.card]
                  }
                }
                return column
              })
            }
            : board
        })
      }
    case DELETE_CARD:
      return {
        ...state,
        boardsBeforeLastAction: boardsCopy,
        boards: state.boards.map(board => {
          return board.id === action.payload.boardId
            ? {
              ...board,
              columns: board.columns.map(column => {
                return (column.id === action.payload.columnId) 
                ? {
                  ...column,
                  cards: column.cards.filter(card => card.id !== action.payload.cardId)
                }
                : column
              })
            }
            : board
        })
      }
    
    case UPDATE_CARD:
      return {
        ...state,
        boardsBeforeLastAction: boardsCopy,
        boards: state.boards.map(board => {
          return board.id === action.payload.boardId
            ? {
              ...board,
              columns: board.columns.map(column => {
                if (column.id === action.payload.columnId) {
                  const card = column.cards.map(card => {
                    return (card.id === action.payload.card.id)
                    ? { ...card, text: action.payload.card.text }
                    : card
                  })
                  return {...column, cards: card}
                }
                return column
              })
            }
            : board
        })
      }
    case SORT_COLUMNS:
      return {
        ...state,
        boardsBeforeLastAction: boardsCopy,
        boards: state.boards.map(board => {
          return board.id === action.payload.boardId
            ? {
              ...board,
              columns: action.payload.columnsSorted
            } : board
        })
      }
    case SORT_CARDS:
      return {
        ...state,
        boardsBeforeLastAction: boardsCopy,
        boards: state.boards.map(board => {
          return board.id === action.payload.boardId
            ? {
              ...board,
              columns: action.payload.columnsCardsSorted
            }
            : board
        })
      }
    case UNDO_THE_LAST_ACTION:
      return {
        ...state,
        boards: state.boardsBeforeLastAction
      }
    default:
      return state
  }
}