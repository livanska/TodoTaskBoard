import React from "react";
import styled, { css } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";
import FONT_STYLES from "../../styles/fontStyles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonVariant = "primary" | "outline";

type Props = {
    title: string;
    variant?: ButtonVariant;
} & ButtonProps;

const ButtonRoot = styled.button<{ variant: ButtonVariant }>`
    display: flex;
    width: fit-content;
    height: fit-content;
    border-radius: ${SPACINGS.xs};
    padding: ${SPACINGS.xs};
    white-space: nowrap;
    cursor: pointer;
    ${FONT_STYLES.label}

    ${({ variant }) =>
        variant === "primary"
            ? css`
                  background-color: ${COLORS.primary};
                  color: ${COLORS.white};
                  border: 1px solid ${COLORS.primary};

                  &:hover {
                      background-color: ${COLORS.primaryHover};
                  }

                  &:active {
                      background-color: ${COLORS.primaryActive};
                  }
              `
            : css`
                  background-color: transparent;
                  color: ${COLORS.primary};
                  border: 1px solid ${COLORS.primary};

                  &:hover {
                      background-color: ${COLORS.primary}10;
                  }

                  &:active {
                      background-color: ${COLORS.primary}20;
                  }
              `}
`;

const Button: React.FC<Props> = ({ variant = "primary", title, ...props }) => {
    return (
        <ButtonRoot variant={variant} {...props}>
            {title}
        </ButtonRoot>
    );
};

export default Button;
