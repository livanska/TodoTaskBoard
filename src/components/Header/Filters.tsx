import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setFilters, setSearch } from "../../redux/settings/reducer";
import { filtersSelector } from "../../redux/settings/selectors";
import SPACINGS from "../../styles/spacings";
import Input from "../Input";
import CheckBox from "../CheckBox";
import { useDebouncedCallback } from "../../hooks/useDebounce";
import COLORS from "../../styles/colors";
import FONT_STYLES from "../../styles/fontStyles";

const Root = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
    align-items: center;
    flex-wrap: wrap;
`;

const FiltersWrapper = styled.div`
    display: flex;
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xs};
    gap: ${SPACINGS.xs};
    background-color: ${COLORS.white};
    padding: ${SPACINGS.xxs} ${SPACINGS.xs};
    height: 100%;
    align-items: center;
`;

const Title = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    ${FONT_STYLES.subtitle};
`;

const Filters: React.FC = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(filtersSelector);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = useDebouncedCallback((value: string) => {
        dispatch(setSearch(value));
    }, 300);

    useEffect(() => handleSearch(searchValue), [searchValue, handleSearch]);

    const handleFilterChange = useCallback(
        (property: string, value: boolean) => {
            dispatch(
                setFilters({
                    ...filters,
                    [property]: value,
                })
            );
        },
        [dispatch, filters]
    );

    return (
        <Root>
            <FiltersWrapper>
                <Title>Filters:</Title>
                <CheckBox
                    label="Show Done"
                    defaultChecked
                    checked={filters?.done}
                    onChange={(e) =>
                        handleFilterChange("done", e.target.checked)
                    }
                />
                <CheckBox
                    label="Show Undone"
                    defaultChecked
                    checked={filters?.unDone}
                    onChange={(e) =>
                        handleFilterChange("unDone", e.target.checked)
                    }
                />
            </FiltersWrapper>
            <Input
                type="search"
                value={searchValue}
                placeholder="Search tasks..."
                onChange={(e) => setSearchValue(e.target.value)}
                width="15rem"
            />
        </Root>
    );
};

export default Filters;
