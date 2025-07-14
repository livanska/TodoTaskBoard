import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addColumn } from "../../redux/columns/reducer";
import useModal from "../../hooks/useModal";
import EntityModal from "../EntityModal";
import { addTask } from "../../redux/tasks/reducer";
import { ColumnCreatePayload, TaskCreatePayload } from "../../redux/types";
import { resetSelectedIds, setSelectMode } from "../../redux/settings/reducer";
import { selectModeSelector } from "../../redux/settings/selectors";
import { EntityPayload, ModalEntityProps } from "../EntityModal/types";
import { EntityType } from "../../types";
import SelectActionsRow from "./SelectActionsRow";
import ActionsRow from "./ActionsRow";
import SPACINGS from "../../styles/spacings";
import COLORS from "../../styles/colors";
import Filters from "./Filters";

const Root = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${SPACINGS.xs};
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: ${SPACINGS.xs};
`;

const Wrapper = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
`;

const Title = styled.div`
    display: flex;
    color: ${COLORS.title};
    font-size: large;
    white-space: nowrap;
`;

type Props = {
    openModal: (props: ModalEntityProps) => void;
};
const Header: React.FC<Props> = ({ openModal }) => {
    const dispatch = useAppDispatch();
    const { isSelectMode } = useAppSelector(selectModeSelector);

    const handleSelectMode = useCallback(
        () => dispatch(setSelectMode(!isSelectMode)),
        [dispatch, isSelectMode]
    );

    return (
        <Root>
            <Row>
                <Title>Table header</Title>
                <Wrapper>
                    <Filters />
                    {isSelectMode ? (
                        <SelectActionsRow
                            openModal={openModal}
                            toggleSelectMode={handleSelectMode}
                        />
                    ) : (
                        <ActionsRow openModal={openModal} />
                    )}
                </Wrapper>
            </Row>
            <Button
                title={isSelectMode ? "Remove selection" : "Select Tasks"}
                onClick={handleSelectMode}
            />
        </Root>
    );
};

export default Header;
