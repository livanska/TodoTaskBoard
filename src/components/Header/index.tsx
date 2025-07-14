import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { setSelectMode } from "../../redux/settings/reducer";
import { selectModeSelector } from "../../redux/settings/selectors";
import { ModalEntityProps } from "../EntityModal/types";
import SelectActionsRow from "./SelectActionsRow";
import ActionsRow from "./ActionsRow";
import SPACINGS from "../../styles/spacings";
import Filters from "./Filters";
import FONT_STYLES from "../../styles/fontStyles";

const Root = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${SPACINGS.xs};
    padding: ${SPACINGS.sm} 0;
    align-items: center;
    flex-wrap: wrap;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: ${SPACINGS.xs};
    align-items: center;
    flex-wrap: wrap;
`;

const Wrapper = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
`;

const Title = styled.div`
    display: flex;
    white-space: nowrap;
    align-self: flex-start;
    ${FONT_STYLES.titleXl};
`;

const SelectionWrapper = styled.div`
    display: flex;
    justify-self: end;
    margin-right: auto;
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
            <Title>Table header</Title>
            <Row>
                <Filters />
                <SelectionWrapper>
                    <Button
                        variant="outline"
                        title={
                            isSelectMode ? "Remove selection" : "Select Tasks"
                        }
                        onClick={handleSelectMode}
                        style={{ marginLeft: "auto" }}
                    />
                </SelectionWrapper>
                <Wrapper>
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
        </Root>
    );
};

export default Header;
