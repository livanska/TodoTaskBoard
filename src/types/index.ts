export type Task = {
    id: string;
    name: string;
    order: number;
    isComplete: boolean;
};

export type Column = {
    id: string;
    title: string;
    tasks: Task[];
};

export type Board = {
    name?: string;
    columns: Column[];
};

export type EntityType = "task" | "column" | "board";
