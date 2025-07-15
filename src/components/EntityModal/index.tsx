import React, { useCallback } from "react";
import Modal from "../Modal";
import { styled } from "styled-components";
import useModal from "../../hooks/useModal";
import TaskBodyContent from "./TaskBodyContent";
import { COMPLETE_FIELD, FORM_ID } from "./constants";
import { ModalProps } from "../Modal/types";
import {
    ColumnCreatePayload,
    TaskCreatePayload,
    TasksMovePayload,
} from "../../redux/types";
import ColumnBodyContent from "./ColumnBodyContent";
import TaskChangeColumnBodyContent from "./TaskChangeColumnBodyContent";
import BoardBodyContent from "./BoardBodyContent";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
`;

const EntityModal = <T,>({
    title,
    initial,
    onActionClick,
    entity,
    action,
}: ModalProps<T>) => {
    const { closeModal } = useModal<ModalProps<T>>();
    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            const isCompleteValue = !!formData.get(COMPLETE_FIELD);
            let isComplete: boolean | null = isCompleteValue;

            if (action === "changeColumn" && !isCompleteValue)
                isComplete = null;

            onActionClick?.({
                ...initial,
                ...Object.fromEntries(formData.entries()),
                ...(isComplete !== null && { isComplete }),
            } as T);
            closeModal();
        },
        [action, closeModal, initial, onActionClick]
    );

    return (
        <Modal title={title} formId={FORM_ID} hideCancel={entity === "board"}>
            <Form onSubmit={handleSubmit} id={FORM_ID}>
                {entity === "task" && !action && (
                    <TaskBodyContent initial={initial as TaskCreatePayload} />
                )}
                {entity === "column" && (
                    <ColumnBodyContent
                        initial={initial as ColumnCreatePayload}
                    />
                )}
                {entity === "board" && <BoardBodyContent />}
                {action === "changeColumn" && (
                    <TaskChangeColumnBodyContent
                        initial={initial as TasksMovePayload}
                    />
                )}
            </Form>
        </Modal>
    );
};

export default EntityModal;
