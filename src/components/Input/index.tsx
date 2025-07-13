import React from "react";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const InputRoot = styled.input`
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xxs};
    padding: ${SPACINGS.xs};
    text-align: left;
    background: white;
    border-radius: ${SPACINGS.xxs};
    color: ${COLORS.font};
`;

const Input: React.FC<Props> = (props) => {
    return <InputRoot {...props} />;
};

export default Input;
