import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardSlice"
import currentBoardReducer from './currentBoardSlice'
import currentItemReducer from './currentItemSlice'
import popupReducer from './popupSlice'

const store = configureStore({
    reducer: {
       boards: boardsReducer,
       currentBoard: currentBoardReducer,
       currentItem: currentItemReducer,
       popup: popupReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
