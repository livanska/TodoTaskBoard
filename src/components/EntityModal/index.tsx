import React, { useCallback } from "react";
import Modal from "../Modal";
import { styled } from "styled-components";
import useModal from "../../hooks/useModal";
import TaskBodyContent from "./TaskBodyContent";
import { COLUMN_FIELD, FORM_ID, NAME_FIELD } from "./constants";
import { ModalProps } from "../Modal/types";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
`;

const EntityModal = <T,>({ onActionClick, title, initial }: ModalProps<T>) => {
    const { closeModal } = useModal<ModalProps<T>>();

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const name = formData.get(NAME_FIELD) as string;
            const columnId = formData.get(COLUMN_FIELD) as string;
            onActionClick?.({ name, columnId } as T);
            closeModal();
        },
        [closeModal, onActionClick]
    );

    return (
        <Modal title={title} formId={FORM_ID}>
            <Form onSubmit={handleSubmit} id={FORM_ID}>
                <TaskBodyContent initial={initial} />
            </Form>
        </Modal>
    );
};

export default EntityModal;
