import { RootState } from "../types";

export const tasksByColumnIdSelector = (state: RootState, columnId: string) =>
    state.tasks
        .filter((task) => task.columnId === columnId)
        .sort((a, b) => a.order - b.order);
