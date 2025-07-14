import {
    AiOutlinePlus,
    AiOutlineClose,
    AiOutlineCheck,
    AiOutlineEdit,
    AiOutlineInfoCircle,
    AiOutlineCheckCircle,
    AiOutlineMinusCircle,
    AiOutlineDelete,
    AiOutlineDrag,
    AiFillCheckCircle,
    AiFillCloseCircle,
} from "react-icons/ai";

export const ICON_TYPES = {
    add: AiOutlinePlus,
    close: AiOutlineClose,
    check: AiOutlineCheck,
    edit: AiOutlineEdit,
    info: AiOutlineInfoCircle,
    notDone: AiOutlineMinusCircle,
    done: AiOutlineCheckCircle,
    delete: AiOutlineDelete,
    drag: AiOutlineDrag,
    select: AiFillCheckCircle,
    unselect: AiFillCloseCircle,
};

export type IconName = keyof typeof ICON_TYPES;
