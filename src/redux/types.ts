import { Column, Task } from "../types";
import { rootReducer, store } from "./store";

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;

export type TaskStoreType = Task & {
    columnId: string;
};
export type ColumnStoreType = Omit<Column, "tasks">;

export type TaskCreatePayload = Pick<TaskStoreType, "name" | "columnId">;
export type ColumnCreatePayload = Pick<ColumnStoreType, "title">;

export type TaskMovePayload = Pick<
    TaskStoreType,
    "id" | "columnId" | "order"
> & {
    newColumnId: string;
    newOrder: number;
};

export type ColumnMovePayload = Pick<ColumnStoreType, "id" | "order"> & {
    newOrder: number;
};

export type SettingsStoreType = {
    name?: string;
    isModalOpen: boolean;
};
