import { createSlice } from "@reduxjs/toolkit";
import { RootState, TaskStoreType } from "../types";

const initialState: TaskStoreType[] = [];

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state) => {
            state.push({
                columnId: 1,
                id: state.length + 1,
                name: "task 2",
                isComplete: false,
                order: 0,
            });
        },
    },
});

export const { addTask } = tasksSlice.actions;

export const tasksSelector = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
