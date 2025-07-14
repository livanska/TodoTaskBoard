import { Column, Task } from "../types";
import { rootReducer, store } from "./store";

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;

export type TaskStoreType = Task & {
    columnId: string;
};
export type ColumnStoreType = Omit<Column, "tasks">;

export type TaskCreatePayload = Omit<TaskStoreType, "order" | "id">;

export type TaskEditPayload = Omit<TaskStoreType, "order">;

export type TasksCompletePayload = {
    ids: string[];
    isComplete: boolean;
};

export type ColumnCreatePayload = Pick<ColumnStoreType, "title">;

export type TaskMovePayload = Pick<
    TaskStoreType,
    "id" | "columnId" | "order"
> & {
    newColumnId: string;
    newOrder: number;
};

export type TasksMovePayload = {
    ids?: string[];
    columnId: string;
    isComplete?: boolean;
};

export type ColumnMovePayload = Pick<ColumnStoreType, "id" | "order"> & {
    newOrder: number;
};

export type SetSelectedIdsPayload = {
    ids: string[];
    isSelected: boolean;
};

export type FiltersPayload = {
    done?: boolean;
    unDone?: boolean;
};

export type SettingsStoreType = {
    name?: string;
    isSelectMode?: boolean;
    isModalOpen: boolean;
    selectedIds?: string[];
    search?: string;
    filters?: FiltersPayload;
};
