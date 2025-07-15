import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    initial?: string;
};

const Wrapper = styled.div`
    position: relative;
    min-width: 200px;
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
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    &:hover {
        background: ${COLORS.background};
    }
`;

const Dropdown: React.FC<Props> = ({
    options,
    onSelect,
    placeholder = "Select...",
    initial,
    name,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const initialOption = useMemo(
        () => options.find((option) => option.value === initial) || options[0],
        [initial, options]
    );

    const [selectedOption, setSelectedOption] = useState<Option>(initialOption);
    const [typedValue, setTypedValue] = useState<string | null>(null);

    const handleClose = useCallback(() => {
        setTypedValue(null);
        setIsOpen(false);
    }, []);

    const wrapperRef = useClickOutside<HTMLDivElement>(handleClose);

    const handleSelect = useCallback(
        (option: Option) => {
            setSelectedOption(option);
            onSelect?.(option.value);
            handleClose();
        },
        [handleClose, onSelect]
    );

    useEffect(() => {
        if (!isOpen && !typedValue && !selectedOption) {
            setTypedValue(null);
            setSelectedOption(initialOption);
        }
    }, [initialOption, isOpen, selectedOption, typedValue]);

    const handleSelectTyping = useCallback((value: string) => {
        setTypedValue(value);
    }, []);

    const filteredOptions = useMemo(
        () =>
            typedValue
                ? options.filter(({ label }) =>
                      label.toLowerCase().startsWith(typedValue.toLowerCase())
                  )
                : options,
        [options, typedValue]
    );

    return (
        <Wrapper ref={wrapperRef} onClick={() => setIsOpen((prev) => !prev)}>
            <Input
                width="100%"
                defaultValue={initialOption?.label}
                value={typedValue !== null ? typedValue : selectedOption.label}
                icon={!isOpen ? "down" : "up"}
                onChange={(e) => handleSelectTyping(e.target.value)}
                placeholder={placeholder}
            />
            {selectedOption && (
                <input
                    type="hidden"
                    name={name}
                    value={selectedOption.value}
                    defaultValue={initialOption.value}
                />
            )}
            {isOpen && (
                <Menu>
                    {filteredOptions?.map(({ label, value }) => (
                        <>
                            <MenuItem
                                key={value}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect({ value, label });
                                }}
                            >
                                {label}
                            </MenuItem>
                        </>
                    ))}
                </Menu>
            )}
        </Wrapper>
    );
};

export default Dropdown;
