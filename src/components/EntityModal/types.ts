import {
    ColumnCreatePayload,
    TaskCreatePayload,
    TaskEditPayload,
    TasksMovePayload,
    ColumnEditPayload,
} from "../../redux/types";
import { ModalProps } from "../Modal/types";

export type EntityPayload =
    | ColumnCreatePayload
    | ColumnEditPayload
    | TaskCreatePayload
    | TaskEditPayload
    | TasksMovePayload;

export type ModalEntityProps = ModalProps<EntityPayload>;
