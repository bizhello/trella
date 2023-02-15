import { IItem } from './../interfaces/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const currentItem: IItem = {
    id: 0,
    title: '',
    text: ''
}

const currentItemSlice = createSlice({
    name: 'currentItem',
    initialState: {
        currentItem
    },
    reducers: {
        changeCurrentItem(state,  action: PayloadAction<IItem>) {
            state.currentItem = action.payload
        }
    }
})

export const { changeCurrentItem } = currentItemSlice.actions;

export default currentItemSlice.reducer;
