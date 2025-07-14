import { createSelector } from "@reduxjs/toolkit";
import { tasksSelector } from "./reducer";

export const tasksByColumnIdSelector = (columnId: string) =>
    createSelector([tasksSelector], (tasks) =>
        tasks
            .filter((task) => task.columnId === columnId)
            .sort((a, b) => a.order - b.order)
    );
