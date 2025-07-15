import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    RootState,
    TaskCreatePayload,
    TaskEditPayload,
    TaskMovePayload,
    TasksCompletePayload,
    TasksMovePayload,
    TaskStoreType,
} from "../types";
import { getUuid } from "../../utils/getUuid";

const initialState: TaskStoreType[] = [];

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setEntireState: (_, action: PayloadAction<TaskStoreType[]>) => {
            return action.payload;
        },
        addTask: (state, action: PayloadAction<TaskCreatePayload>) => {
            const { columnId, name, isComplete } = action.payload;
            state.push({
                columnId,
                id: getUuid(),
                name,
                isComplete,
                order: state.filter((task) => task.columnId === columnId)
                    .length,
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
        deleteTasks: (state, action: PayloadAction<string[]>) => {
            const taskIds = action.payload;
            if (taskIds.length)
                return state.filter((task) => !taskIds.includes(task.id));
        },
        editTask: (state, action: PayloadAction<TaskEditPayload>) => {
            const { id } = action.payload;
            const index = state.findIndex((task) => task.id === id);
            if (index !== -1)
                state[index] = { ...state[index], ...action.payload };
        },
        toggleAllTaskComplete: (
            state,
            action: PayloadAction<TasksCompletePayload>
        ) => {
            const { ids, isComplete } = action.payload;
            if (ids.length)
                return state.map((task) => ({
                    ...task,
                    isComplete: ids.includes(task.id)
                        ? isComplete
                        : task.isComplete,
                }));
        },
        moveTask: (state, action: PayloadAction<TaskMovePayload>) => {
            const { id, newColumnId, columnId, newOrder } = action.payload;

            const movedTask = state.find((task) => task.id === id);
            if (!movedTask) return;

            if (columnId === newColumnId) {
                // Moving within the same column: reorder tasks inside the column

                // Get all tasks in the column sorted by order, excluding the moved task
                const tasksInColumn = state
                    .filter((t) => t.columnId === columnId && t.id !== id)
                    .sort((a, b) => a.order - b.order);

                // Insert the moved task at newOrder position (1-based)
                const insertIndex =
                    typeof newOrder === "number" && newOrder >= 1
                        ? Math.min(newOrder - 1, tasksInColumn.length)
                        : tasksInColumn.length;

                tasksInColumn.splice(insertIndex, 0, movedTask);

                // Re-assign orders sequentially
                tasksInColumn.forEach((task, index) => {
                    task.order = index + 1;
                });

                // Update the moved task's order
                movedTask.order = insertIndex + 1;
            } else {
                const oldColumnTasks = state
                    .filter((t) => t.columnId === columnId && t.id !== id)
                    .sort((a, b) => a.order - b.order);

                oldColumnTasks.forEach((task, idx) => {
                    task.order = idx + 1;
                });

                const newColumnTasks = state
                    .filter((t) => t.columnId === newColumnId)
                    .sort((a, b) => a.order - b.order);

                const insertIndex = Math.min(
                    Math.max((newOrder ?? newColumnTasks.length + 1) - 1, 0),
                    newColumnTasks.length
                );

                newColumnTasks.splice(insertIndex, 0, movedTask);

                newColumnTasks.forEach((task, idx) => {
                    task.order = idx + 1;
                });

                movedTask.columnId = newColumnId;
                movedTask.order = newOrder;
            }
        },
        moveTasks: (state, action: PayloadAction<TasksMovePayload>) => {
            const { ids, columnId, isComplete } = action.payload;
            if (!ids?.length) return;

            const oldColumnIds = new Set<string>();
            const newColumnTasks = state.filter(
                (task) => task.columnId === columnId
            );

            state.forEach((task) => {
                if (ids.includes(task.id)) {
                    oldColumnIds.add(task.columnId);
                    task.columnId = columnId;
                    task.order = newColumnTasks.length + 1;
                    task.isComplete = isComplete ?? task.isComplete;
                }
            });

            const sortedTasks = state
                .filter((task) => task.columnId === columnId)
                .sort((a, b) => a.order - b.order);

            sortedTasks.forEach((task, index) => {
                task.order = index + 1;
            });

            oldColumnIds.forEach((columnId) => {
                const tasksInOldColumn = state
                    .filter((task) => task.columnId === columnId)
                    .sort((a, b) => a.order - b.order);

                tasksInOldColumn.forEach((task, index) => {
                    task.order = index + 1;
                });
            });
        },
    },
});

export const tasksActions = tasksSlice.actions;
export const {
    addTask,
    toggleTaskComplete,
    deleteTask,
    moveTask,
    editTask,
    toggleAllTaskComplete,
    deleteTasks,
    moveTasks,
} = tasksActions;

export const tasksSelector = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
