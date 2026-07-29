import { createSlice } from "@reduxjs/toolkit";

export const ActiveTabSlice = createSlice({
    name: "tab",
    initialState: { currentTab: "home"},
    reducers: {
        setTab: (state, action) => {
            state.currentTab = action.payload
        }
    }
})

export const { setTab } = ActiveTabSlice.actions

export default ActiveTabSlice.reducer