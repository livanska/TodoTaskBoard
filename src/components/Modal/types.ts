import { EntityType } from "../../types";

export type ModalProps<T> = {
    entity: EntityType;
    id?: string;
    initial?: string;
    onActionClick?: (payload: T) => void;
    title?: string;
};
