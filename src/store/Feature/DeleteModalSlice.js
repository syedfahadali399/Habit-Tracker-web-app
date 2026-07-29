import { createSlice } from "@reduxjs/toolkit";

export const DeleteModalSlice = createSlice({
    name: "deleteModal",
    initialState: { isOpen: false },
    reducers: {
        openDeleteModal: (state) => {
            state.isOpen = true
            console.log(state.isOpen);
            
        },
        closeDeleteModal: (state) => {
            state.isOpen = false
        }
    }
})

export const { openDeleteModal, closeDeleteModal} = DeleteModalSlice.actions

export default DeleteModalSlice.reducer