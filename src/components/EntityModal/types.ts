import {
    ColumnCreatePayload,
    TaskCreatePayload,
    TaskEditPayload,
    TasksMovePayload,
} from "../../redux/types";
import { ModalProps } from "../Modal/types";

export type EntityPayload =
    | ColumnCreatePayload
    | TaskCreatePayload
    | TaskEditPayload
    | TasksMovePayload;

export type ModalEntityProps = ModalProps<EntityPayload>;
