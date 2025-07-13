import React from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";
import { isModalOpenSelector } from "../../redux/settings/selectors";
import { useAppSelector } from "../../redux/store";
import useModal from "../../hooks/useModal";
import Icon from "../Icon";
import useClickOutside from "../../hooks/useClickOutside";
import Button from "../Button";

type Props = {
    children?: React.ReactNode;
    title?: string;
    formId?: string;
};

const Overlay = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
`;

const Body = styled.div`
    min-height: 20rem;
    min-width: 30rem;
    background-color: ${COLORS.white};
    align-self: center;
    border-radius: ${SPACINGS.xs};
    padding: ${SPACINGS.sm};
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
`;

const IconWrapper = styled.div`
    position: absolute;
    right: ${SPACINGS.sm};
    padding-top: ${SPACINGS.xxs};
`;

const Footer = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
    width: 100%;
    align-items: end;
    justify-content: end;
`;

const Title = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-grow: 1;
    padding: ${SPACINGS.sm} 0;
    position: relative;
`;

const Modal: React.FC<Props> = ({
    children,
    title = "Modal title",
    formId,
}) => {
    const isModalOpen = useAppSelector(isModalOpenSelector);
    const { closeModal } = useModal();
    const modalCloseRef = useClickOutside<HTMLDivElement>(closeModal);
    const modalRoot = document.getElementById("modal");

    if (!isModalOpen || !modalRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <Overlay>
            <Body ref={modalCloseRef}>
                <IconWrapper>
                    <Icon name="close" onClick={closeModal} />
                </IconWrapper>
                <Title>{title}</Title>
                <Content>{children}</Content>
                <Footer>
                    <Button title="Cancel" onClick={closeModal} />
                    <Button form={formId} title="Save" type="submit" />
                </Footer>
            </Body>
        </Overlay>,
        modalRoot
    );
};

export default Modal;
