export type Task = {
    id: string;
    name: string;
    order: number;
    isComplete?: boolean;
};

export type Column = {
    id: string;
    title: string;
    tasks: Task[];
    order: number;
};

export type Board = {
    name: string;
    columns: Column[];
};

export type TaskDraggable = {
    type: string;
    taskId: string;
    fromColumnId: string;
    order: number;
};

export type ColumnDraggable = {
    type: string;
    columnId: string;
    order: number;
};

export type EntityType = "task" | "column" | "board";
