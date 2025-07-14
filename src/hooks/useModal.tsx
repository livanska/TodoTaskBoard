import { useCallback, useState } from "react";
import { setIsModalOpen } from "../redux/settings/reducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ModalProps } from "../components/Modal/types";
import { isModalOpenSelector } from "../redux/settings/selectors";

type ModalReturnProps<T> = {
    isOpen: boolean;
    modalProps: ModalProps<T>;
    openModal: (props: ModalProps<T>) => void;
    closeModal: () => void;
};

const useModal = <T,>(): ModalReturnProps<T> => {
    const dispatch = useAppDispatch();
    const isModalOpenFromStore = useAppSelector(isModalOpenSelector);

    const [modalProps, setModalProps] = useState<ModalProps<T>>({
        entity: "board",
    });

    const openModal = useCallback(
        (props: ModalProps<T>) => {
            setModalProps(props);
            dispatch(setIsModalOpen(true));
        },
        [dispatch]
    );

    const closeModal = useCallback(() => {
        setModalProps({ entity: "board" });
        dispatch(setIsModalOpen(false));
    }, [dispatch]);

    return {
        isOpen: isModalOpenFromStore,
        modalProps,
        openModal,
        closeModal,
    };
};

export default useModal;
