import React from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";

import useModal from "../../hooks/useModal";
import Icon from "../Icon";
import useClickOutside from "../../hooks/useClickOutside";
import Button from "../Button";
import { forMobile } from "../../styles/media";
import FONT_STYLES from "../../styles/fontStyles";

type Props = {
    children?: React.ReactNode;
    title?: string;
    formId?: string;
    hideCancel?: boolean;
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
    max-height: 24rem;
    max-width: 30rem;

    min-height: 10rem;
    min-width: 20rem;

    ${forMobile(`
        max-height: 80%;
        max-width: 80%;
        min-height: 20%;
        min-width: 60%;
   `)}

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
    ${FONT_STYLES.title};
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
    title = "",
    formId,
    hideCancel = false,
}) => {
    const { closeModal, isOpen } = useModal();
    const modalCloseRef = useClickOutside<HTMLDivElement>(
        () => !hideCancel && closeModal()
    );
    const modalRoot = document.getElementById("modal");

    if (!isOpen || !modalRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <Overlay>
            <Body ref={modalCloseRef}>
                {!hideCancel && (
                    <IconWrapper>
                        <Icon name="close" onClick={closeModal} />
                    </IconWrapper>
                )}
                <Title>{title}</Title>
                <Content>{children}</Content>

                <Footer>
                    {!hideCancel && (
                        <Button
                            title="Cancel"
                            onClick={closeModal}
                            variant="outline"
                        />
                    )}
                    <Button form={formId} title="Save" type="submit" />
                </Footer>
            </Body>
        </Overlay>,
        modalRoot
    );
};

export default Modal;
