import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ColumnCreatePayload,
    ColumnEditPayload,
    ColumnMovePayload,
    ColumnStoreType,
    RootState,
} from "../types";
import { getUuid } from "../../utils/getUuid";

const initialState: ColumnStoreType[] = [];

const columnsSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        setEntireState: (_, action: PayloadAction<ColumnStoreType[]>) => {
            return action.payload;
        },
        addColumn: (state, action: PayloadAction<ColumnCreatePayload>) => {
            const { title } = action.payload;
            state.push({
                id: getUuid(),
                title,
                order: state.length + 1,
            });
        },
        deleteColumn: (state, action: PayloadAction<string>) => {
            const columnId = action.payload;
            return state.filter(({ id }) => id !== columnId);
        },
        editColumn: (state, action: PayloadAction<ColumnEditPayload>) => {
            const { id, title } = action.payload;
            const column = state.find((col) => col.id === id);
            if (column) column.title = title;
        },
        moveColumn: (state, action: PayloadAction<ColumnMovePayload>) => {
            const { id, newOrder } = action.payload;

            const sorted = [...state].sort((a, b) => a.order - b.order);
            const fromIndex = sorted.findIndex((col) => col.id === id);
            if (fromIndex === -1) return;

            const [movedColumn] = sorted.splice(fromIndex, 1);

            const toIndex = Math.max(0, Math.min(newOrder - 1, sorted.length));
            sorted.splice(toIndex, 0, movedColumn);
            sorted.forEach((col, index) => {
                const target = state.find((c) => c.id === col.id);
                if (target) target.order = index + 1;
            });
        },
    },
});

export const columnsActions = columnsSlice.actions;
export const { addColumn, deleteColumn, moveColumn, editColumn } =
    columnsActions;

export const columnsSelector = (state: RootState) => state.columns;

export default columnsSlice.reducer;
