import React from "react";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";

type Props = {
    initial?: string;
};

const nameField = "name";

const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xxs};
    padding: ${SPACINGS.xs};
`;

const Label = styled.div`
    color: ${COLORS.font};
`;

const TaskBodyContent: React.FC<Props> = ({ initial }) => {
    return (
        <>
            <Label>Task title:</Label>
            <TextArea defaultValue={initial} name={nameField} />
        </>
    );
};

export default TaskBodyContent;
