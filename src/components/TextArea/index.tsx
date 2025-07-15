import React from "react";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";

type Props = React.ButtonHTMLAttributes<HTMLTextAreaElement>;

const TextAreaRoot = styled.textarea`
    width: 100%;
    resize: none;
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xxs};
    padding: ${SPACINGS.xs};
    height: 9rem;
`;

const TextArea: React.FC<Props> = (props) => {
    return <TextAreaRoot maxLength={300} {...props} />;
};

export default TextArea;
