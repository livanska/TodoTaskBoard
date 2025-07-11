export type Task = {
    id: number;
    name: string;
    order: number;
    isComplete: boolean;
};

export type Column = {
    id: number;
    title: string;
    tasks: Task[];
};

export type Board = {
    name?: string;
    columns: Column[];
};
