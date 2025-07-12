import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch } from "../../redux/store";
import { addColumn } from "../../redux/columns/reducer";
import {} from "react-icons";

const Root = styled.div`
    height: 10rem;
    width: 100%;
    display: flex;
`;

const Wrapper = styled.div``;

const Header: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleAddColumn = () => dispatch(addColumn({ title: "New column" }));

    return (
        <Root>
            <Wrapper>
                Table header <Button title="New task" onClick={() => {}} />
                <Button title="New column" onClick={handleAddColumn} />
            </Wrapper>
        </Root>
    );
};

export default Header;
