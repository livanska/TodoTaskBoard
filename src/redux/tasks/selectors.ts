import { createSelector } from "@reduxjs/toolkit";
import { tasksSelector } from "./reducer";

export const selectTasksByColumnId = (columnId: number) =>
    createSelector([tasksSelector], (tasks) =>
        tasks.filter((task) => task.columnId === columnId)
    );
