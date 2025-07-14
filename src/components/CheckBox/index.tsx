import styled from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";
import { useState } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    width: ${SPACINGS.sm};
    height: ${SPACINGS.sm};
    min-width: ${SPACINGS.sm};
    min-height: ${SPACINGS.sm};
    background: ${({ checked }) => (checked ? COLORS.primary : "white")};
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xxs};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
        content: "✓";
        display: ${({ checked }) => (checked ? "block" : "none")};
        color: white;
        font-size: 0.5rem;
    }
`;

const Label = styled.label`
    display: inline-flex;
    align-items: center;
    gap: ${SPACINGS.xs};
    cursor: pointer;
    user-select: none;
    position: relative;
    white-space: nowrap;
`;

const CheckBox: React.FC<Props> = ({ label, ...inputProps }) => {
    const [localChecked, setLocalChecked] = useState(
        !!inputProps.defaultChecked
    );

    return (
        <Label>
            <HiddenCheckbox
                {...inputProps}
                onChange={(e) => {
                    setLocalChecked(e.target.checked);
                    inputProps.onChange?.(e);
                }}
            />
            <StyledCheckbox checked={localChecked} />
            {label}
        </Label>
    );
};

export default CheckBox;
