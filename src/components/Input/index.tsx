import React from "react";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";
import { IconName } from "../Icon/constants";
import Icon from "../Icon";
import FONT_STYLES from "../../styles/fontStyles";

type Props = {
    width?: string;
    icon?: IconName;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "width">;

const Root = styled.div``;

const InputRoot = styled.input<{ width?: string; paddingRight?: boolean }>`
    width: 100%;
    resize: none;
    border: 1px solid ${COLORS.border};
    padding: ${SPACINGS.xs};
    text-align: left;
    background: white;
    border-radius: ${SPACINGS.xs};
    max-height: 2.125rem;
    max-width: 30rem;
    ${FONT_STYLES.text}
    ${({ paddingRight }) => paddingRight && `padding-right: ${SPACINGS.md};`};
    width: ${({ width }) => width || "15rem"};
    &::placeholder {
        ${FONT_STYLES.placeholder}
    }
`;

const IconRoot = styled.div`
    position: absolute;
    top: 25%;
    right: ${SPACINGS.xs};
`;

const Input: React.FC<Props> = ({ required = true, icon, width, ...props }) => {
    return (
        <Root>
            <InputRoot
                maxLength={30}
                required={required}
                width={width}
                paddingRight={!!icon}
                {...props}
            />
            <IconRoot>
                <Icon name={icon as IconName} />
            </IconRoot>
        </Root>
    );
};

export default Input;
