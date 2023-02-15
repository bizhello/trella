import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IHandlePopup {
    namePopup: string;
    isPopup: boolean
}
interface IChangeValuePopup {
    id: number,
    title: string,
    description: string,
}

const popupSlice = createSlice({
    name: 'Popup',
    initialState: {
        value: {
            id: 0,
            title: '',
            description: ''
        },
        popupAdd: false,
        popupEdit: false
    },
    reducers: {
        handlePopup(state, action: PayloadAction<IHandlePopup>) {
            if (action.payload.namePopup === 'popupAdd') {
                state.popupAdd = action.payload.isPopup;
            }
            if (action.payload.namePopup === 'popupEdit') {
                state.popupEdit = action.payload.isPopup;
            }
        },
        changeValuePopup(state, action: PayloadAction<IChangeValuePopup>) {
            state.value = action.payload
        }
    }
})

export const { handlePopup, changeValuePopup} = popupSlice.actions

export default popupSlice.reducer;
