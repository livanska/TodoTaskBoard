import { useCallback, useState } from "react";
import { setIsModalOpen } from "../redux/settings/reducer";
import { useAppDispatch } from "../redux/store";
import { EntityType } from "../types";

type Props = {
    entity: EntityType;
    id?: string;
    initial?: string;
};
const useModal = () => {
    const [modalProps, setModalProps] = useState<Props>({ entity: "board" });
    const dispatch = useAppDispatch();

    const handleIsOpen = useCallback(
        (isOpen: boolean) => dispatch(setIsModalOpen(isOpen)),
        [dispatch]
    );

    const openModal = (props?: Props) => {
        props?.entity && setModalProps(props);
        handleIsOpen(true);
    };
    const closeModal = () => handleIsOpen(false);

    return { openModal, closeModal, handleIsOpen, modalProps };
};

export default useModal;
