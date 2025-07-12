import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Root = styled.div`
    height: 10rem;
    width: 100%;
    display: flex;
`;

const Wrapper = styled.div``;

const Header: React.FC = () => {
    return (
        <Root>
            <Wrapper>
                Table header <Button title="New task" onClick={() => {}} />
            </Wrapper>
        </Root>
    );
};

export default Header;
