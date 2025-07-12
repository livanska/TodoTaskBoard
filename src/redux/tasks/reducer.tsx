import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, TaskCreatePayload, TaskStoreType } from "../types";
import { getUuid } from "../../utils/getUuid";

const initialState: TaskStoreType[] = [];

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskCreatePayload>) => {
            const { columnId, name } = action.payload;
            state.push({
                columnId,
                id: getUuid(),
                name,
                isComplete: false,
                order: 0,
            });
        },
        toggleTaskComplete: (state, action: PayloadAction<string>) => {
            const taskId = action.payload;
            const task = state.find((task) => task.id === taskId);
            if (task) {
                task.isComplete = !task.isComplete;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            const taskId = action.payload;
            return state.filter((task) => task.id !== taskId);
        },
    },
});

export const { addTask, toggleTaskComplete, deleteTask } = tasksSlice.actions;

export const tasksSelector = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
