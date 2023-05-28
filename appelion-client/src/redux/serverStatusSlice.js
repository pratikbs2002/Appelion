import { createSlice } from "@reduxjs/toolkit";

export const serverStatusSlice = createSlice({
    name: "server-status",
    initialState: {
        isUp: true
    },
    reducers: {
        setServerStatus: (state, action) => {
            state.isUp = action.payload;
        }
    },
});

export const { setServerStatus } = serverStatusSlice.actions;
