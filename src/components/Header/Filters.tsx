import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addColumn } from "../../redux/columns/reducer";
import useModal from "../../hooks/useModal";
import EntityModal from "../EntityModal";
import {
    addTask,
    deleteTasks,
    moveTasks,
    toggleAllTaskComplete,
} from "../../redux/tasks/reducer";
import {
    ColumnCreatePayload,
    FiltersPayload,
    TaskCreatePayload,
    TasksMovePayload,
} from "../../redux/types";
import {
    resetSelectedIds,
    setFilters,
    setSearch,
    setSelectMode,
} from "../../redux/settings/reducer";
import {
    filtersSelector,
    searchSelector,
    selectedIdsSelector,
    selectModeSelector,
} from "../../redux/settings/selectors";
import { EntityPayload, ModalEntityProps } from "../EntityModal/types";
import { EntityType } from "../../types";
import SPACINGS from "../../styles/spacings";
import Input from "../Input";
import CheckBox from "../CheckBox";
import { useDebouncedCallback } from "../../hooks/useDebounce";

const Root = styled.div`
    width: 100%;
    display: flex;
    gap: ${SPACINGS.xs};
`;

const Search = styled(Input)`
    width: 10rem;
`;

type Props = {};
const Filters: React.FC<Props> = ({}) => {
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
            <Search
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <CheckBox
                label="Show Done"
                defaultChecked
                checked={filters?.done}
                onChange={(e) => handleFilterChange("done", e.target.checked)}
            />
            <CheckBox
                label="Show Undone"
                defaultChecked
                checked={filters?.unDone}
                onChange={(e) => handleFilterChange("unDone", e.target.checked)}
            />
        </Root>
    );
};

export default Filters;
