import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnCreatePayload, ColumnStoreType, RootState } from "../types";
import { getUuid } from "../../utils/getUuid";

const initialState: ColumnStoreType[] = [];

const columnsSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<ColumnCreatePayload>) => {
            const { title } = action.payload;
            state.push({
                id: getUuid(),
                title,
            });
        },
        deleteColumn: (state, action: PayloadAction<string>) => {
            const columnId = action.payload;
            return state.filter(({ id }) => id !== columnId);
        },
    },
});

export const columnsActions = columnsSlice.actions;
export const { addColumn, deleteColumn } = columnsActions;

export const columnsSelector = (state: RootState) => state.columns;

export default columnsSlice.reducer;
