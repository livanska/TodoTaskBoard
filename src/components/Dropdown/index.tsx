import React, { useState } from "react";
import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";
import Input from "../Input";

type Option = {
    label: string;
    value: string;
};

type Props = {
    options: Option[];
    onSelect?: (value: string) => void;
    placeholder?: string;
    name?: string;
};

const Wrapper = styled.div`
    position: relative;
    min-width: 200px;
`;

const Toggle = styled.select`
    width: 100%;
    padding: ${SPACINGS.xs};
    text-align: left;
    border: 1px solid ${COLORS.border};
    background: white;
    cursor: pointer;
    border-radius: ${SPACINGS.xxs};
`;

const Menu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    background: ${COLORS.white};
    border: 1px solid ${COLORS.border};
    list-style: none;
    z-index: 10;
    border-radius: ${SPACINGS.xxs};
`;

const MenuItem = styled.option`
    padding: ${SPACINGS.xs};
    cursor: pointer;
    &:hover {
        background: ${COLORS.background};
    }
`;

const Dropdown: React.FC<Props> = ({
    options,
    onSelect,
    placeholder = "Select...",
    name,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>();

    const wrapperRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        onSelect?.(option.value);
        setIsOpen(false);
    };

    return (
        <Wrapper ref={wrapperRef}>
            <Input
                value={selectedOption?.label}
                onClick={() => setIsOpen((prev) => !prev)}
            />

            {/* hidden input for submitting the actual value */}
            {selectedOption && (
                <input type="hidden" name={name} value={selectedOption.value} />
            )}
            {isOpen && (
                <Menu>
                    {options.map(({ label, value }) => (
                        <MenuItem
                            key={value}
                            onClick={() => handleSelect({ value, label })}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </Wrapper>
    );
};

export default Dropdown;
