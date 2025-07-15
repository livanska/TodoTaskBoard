import { EntityType } from "../../types";

type ActionType = "changeColumn";

export type ModalProps<T> = {
    entity: EntityType;
    action?: ActionType;
    id?: string;
    initial?: T;
    onActionClick?: (payload: T) => void;
    title?: string;
};
