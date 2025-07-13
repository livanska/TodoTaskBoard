import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
    title: string;
} & ButtonProps;

const ButtonRoot = styled.button`
    display: flex;
    width: fit-content;
    height: fit-content;
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
    border: none;
    border-radius: ${SPACINGS.xxs};
    padding: ${SPACINGS.xs};
    cursor: pointer;
    &:hover {
        background-color: ${COLORS.primaryHover};
    }
    &:active {
        background-color: ${COLORS.primaryActive};
    }
`;

const Button: React.FC<Props> = ({ title, ...props }) => {
    return <ButtonRoot {...props}>{title}</ButtonRoot>;
};

export default Button;
