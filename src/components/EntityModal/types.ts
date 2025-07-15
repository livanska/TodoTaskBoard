import {
    ColumnCreatePayload,
    TaskCreatePayload,
    TaskEditPayload,
    TasksMovePayload,
    ColumnEditPayload,
    BoardCreatePayload,
} from "../../redux/types";
import { ModalProps } from "../Modal/types";

export type EntityPayload =
    | ColumnCreatePayload
    | ColumnEditPayload
    | TaskCreatePayload
    | TaskEditPayload
    | TasksMovePayload
    | BoardCreatePayload;

export type ModalEntityProps = ModalProps<EntityPayload>;
