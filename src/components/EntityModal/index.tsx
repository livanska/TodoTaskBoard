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

            const isComplete =
                isCompleteValue || action !== "changeColumn" ? false : null;

            onActionClick?.({
                ...initial,
                ...Object.fromEntries(formData.entries()),
                ...(isComplete !== null && { isComplete: isComplete }),
            } as T);
            closeModal();
        },
        [action, closeModal, initial, onActionClick]
    );

    return (
        <Modal title={title} formId={FORM_ID}>
            <Form onSubmit={handleSubmit} id={FORM_ID}>
                {entity === "task" ? (
                    !action && (
                        <TaskBodyContent
                            initial={initial as TaskCreatePayload}
                        />
                    )
                ) : (
                    <ColumnBodyContent
                        initial={initial as ColumnCreatePayload}
                    />
                )}
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
