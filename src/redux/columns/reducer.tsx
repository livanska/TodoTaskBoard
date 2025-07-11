import { createSlice } from "@reduxjs/toolkit";
import { ColumnStoreType, RootState } from "../types";

const initialState: ColumnStoreType[] = [];

const columnsSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        addColumn: (state, action) => {},
    },
});

export const { addColumn } = columnsSlice.actions;

export const columnsSelector = (state: RootState) => state.columns;

export default columnsSlice.reducer;
