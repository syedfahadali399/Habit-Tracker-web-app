import { createSlice } from "@reduxjs/toolkit";

export const InputModalSlice = createSlice({
    name: "inputModal",
    initialState: { isOpen: false },
    reducers: {
        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
        }
    }
})

export const { openModal, closeModal } = InputModalSlice.actions

export default InputModalSlice.reducer