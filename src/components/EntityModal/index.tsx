import React from "react";
import Modal from "../Modal";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";
import useModal from "../../hooks/useModal";

type Props = {
    title?: string;
    onActionClick: (name: string) => void;
};

const formId = "new-entity-modal";
const nameField = "name";

const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xxs};
    padding: ${SPACINGS.xs};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const Label = styled.div`
    color: ${COLORS.font};
`;

const EntityModal: React.FC<Props> = ({ onActionClick, ...props }) => {
    const {
        closeModal,
        modalProps: { initial },
    } = useModal();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get(nameField) as string;
        onActionClick(name);
        closeModal();
    };

    return (
        <Modal title="jnjnjn" formId={formId} {...props}>
            <Form onSubmit={handleSubmit} id={formId}>
                <Label>Task title:</Label>
                <TextArea defaultValue={initial} name={nameField} />
            </Form>
        </Modal>
    );
};

export default EntityModal;
