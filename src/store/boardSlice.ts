import { IBoard, IItem } from './../interfaces/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChangeBoard {
  board: IBoard,
  currentBoard: IBoard
}

interface IDeleteItem {
  item: IItem,
  board: IBoard,
}

interface IOptionsItem {
  item: IItem,
  boardIndex: number,
}

const boards: IBoard[] = [
    {
      id: 1,
      title: "Сделать",
      items: [
        { id: 1, title: "title-1", text: "text-1" },
        { id: 2, title: "title-2", text: "text-2" },
      ],
    },
    {
      id: 2,
      title: "Делаю",
      items: [
        { id: 3, title: "title-3", text: "text-3" },
        { id: 4, title: "title-4", text: "text-4" },
      ],
    },
    {
      id: 3,
      title: "Сделано",
      items: [
        { id: 5, title: "title-5", text: "text-5" },
        { id: 6, title: "title-6", text: "text-6" },
      ],
    },
]

const boardsSlice = createSlice({
    name: 'boards',
    initialState: {
        boards
    },
    reducers: {
        changeBoard(state, action: PayloadAction<IChangeBoard>) {
            state.boards = state.boards.map(board => {
                if (board.id === action.payload.board.id) {
                    return action.payload.board;
                  }
                  if (board.id === action.payload.currentBoard.id) {
                    return action.payload.currentBoard;
                  }
                  return board;
            })
        },
        deleteItem(state, action: PayloadAction<IDeleteItem>) {
          state.boards = state.boards.map(board => {
            if (board.id === action.payload.board.id) {
              const items =  board.items.filter(item => item.id !== action.payload.item.id)
              board.items  = items;
            }
              return board
          })
        },
        addItem(state, action:PayloadAction<IOptionsItem>) {
          let newBoard = state.boards[action.payload.boardIndex].items;
          newBoard.push(action.payload.item)
          state.boards[action.payload.boardIndex].items = newBoard;
        },
        editItem(state, action:PayloadAction<IOptionsItem>) {
          let newBoard = state.boards[action.payload.boardIndex].items.map(item => {
            if (item.id === action.payload.item.id) {
              return action.payload.item;
            }
            return item;
          })
          state.boards[action.payload.boardIndex].items = newBoard;
        }

    }
})

export const { changeBoard, deleteItem, addItem, editItem } = boardsSlice.actions

export default boardsSlice.reducer;
