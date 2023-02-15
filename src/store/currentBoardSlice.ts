import { IBoard } from './../interfaces/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const currentBoard: IBoard = {
    id: 0,
    title: '',
    items: []
}

const currentBoardSlice = createSlice({
    name: 'currentBoard',
    initialState: {
        currentBoard
    },
    reducers: {
        changeCurrentBoard(state,  action: PayloadAction<IBoard>) {
            state.currentBoard = action.payload
        }
    }
})

export const { changeCurrentBoard } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;
