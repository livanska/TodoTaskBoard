import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";

type Props = {
    title: string;
    onClick: () => void;
};

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

const Button: React.FC<Props> = ({ title, onClick }) => {
    return <ButtonRoot onClick={onClick}>{title}</ButtonRoot>;
};

export default Button;
