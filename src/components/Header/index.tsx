import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch } from "../../redux/store";
import { addColumn } from "../../redux/columns/reducer";
import {} from "react-icons";
import useModal from "../../hooks/useModal";
import EntityModal from "../EntityModal";

const Root = styled.div`
    height: 10rem;
    width: 100%;
    display: flex;
`;

const Wrapper = styled.div``;

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const { openModal } = useModal();

    const handleAddColumn = useCallback(
        (name: string) => dispatch(addColumn({ title: name })),
        [dispatch]
    );

    return (
        <Root>
            <Wrapper>
                Table header
                <Button
                    title="New task"
                    onClick={() => openModal({ entity: "task" })}
                />
                <Button
                    title="New column"
                    onClick={() => openModal({ entity: "column" })}
                />
            </Wrapper>
            <EntityModal onActionClick={handleAddColumn} />
        </Root>
    );
};

export default Header;
