import { useCallback, useState } from "react";
import { setIsModalOpen } from "../redux/settings/reducer";
import { useAppDispatch } from "../redux/store";
import { ModalProps } from "../components/Modal/types";

const useModal = <T,>() => {
    const [modalProps, setModalProps] = useState<ModalProps<T>>({
        entity: "board",
    });
    const dispatch = useAppDispatch();

    const handleIsOpen = useCallback(
        (isOpen: boolean) => dispatch(setIsModalOpen(isOpen)),
        [dispatch]
    );

    const openModal = useCallback(
        (props?: ModalProps<T>) => {
            props?.entity && setModalProps(props);
            handleIsOpen(true);
        },
        [handleIsOpen]
    );
    const closeModal = () => handleIsOpen(false);

    return { openModal, closeModal, handleIsOpen, modalProps };
};

export default useModal;
