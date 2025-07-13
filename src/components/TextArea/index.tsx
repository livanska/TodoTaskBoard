import React from "react";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";

type Props = React.ButtonHTMLAttributes<HTMLTextAreaElement>;

const TextAreaRoot = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xxs};
    padding: ${SPACINGS.xs};
`;

const TextArea: React.FC<Props> = (props) => {
    return <TextAreaRoot {...props} />;
};

export default TextArea;
