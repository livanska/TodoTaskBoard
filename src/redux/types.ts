import { Column, Task } from "../types";
import { rootReducer, store } from "./store";

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;

export type TaskStoreType = Task & {
    columnId: string;
};

export type ColumnStoreType = Omit<Column, "tasks">;
