import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";
import FONT_STYLES from "../../styles/fontStyles";

type Position = {
    x: number;
    y: number;
};

const TriggerRoot = styled.div`
    display: "inline-flex";
    position: "relative";
`;

const TooltipContent = styled.div<{ top: number; left: number }>`
    position: fixed;
    z-index: 9999;
    background: ${COLORS.blackTransparent};
    color: ${COLORS.white};
    padding: ${SPACINGS.xxs} ${SPACINGS.xs};
    border-radius: ${SPACINGS.xxs};
    ${FONT_STYLES.labelInverted}
    white-space: nowrap;
    pointer-events: none;
    transform: translate(-50%, -100%);
    transition: opacity 0.2s ease;
    ${({ top, left }) => `top: ${top}px; 
    left: ${left}px;`}
`;

export const withTooltip =
    <P extends object>(
        Component: React.ComponentType<P>,
        tooltip: string
    ): React.FC<P> =>
    (props) => {
        const [visible, setVisible] = useState(false);
        const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
        const triggerRef = useRef<HTMLDivElement>(null);
        const tooltipRef = useRef<HTMLDivElement>(null);
        const hideTimeout = useRef<number | null>(null);

        const showTooltip = () => {
            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current);
                hideTimeout.current = null;
            }

            const rect = triggerRef.current?.getBoundingClientRect();
            if (rect) {
                setPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                });
                setVisible(true);
            }
        };

        const hideTooltip = () => {
            if (hideTimeout.current) return;

            hideTimeout.current = window.setTimeout(() => {
                setVisible(false);
                hideTimeout.current = null;
            }, 100);
        };

        const isInsideTooltipOrTrigger = (event: MouseEvent) => {
            const { clientX: x, clientY: y } = event;
            const triggerRect = triggerRef.current?.getBoundingClientRect();
            const tooltipRect = tooltipRef.current?.getBoundingClientRect();

            const insideTrigger =
                triggerRect &&
                x >= triggerRect.left &&
                x <= triggerRect.right &&
                y >= triggerRect.top &&
                y <= triggerRect.bottom;

            const insideTooltip =
                tooltipRect &&
                x >= tooltipRect.left &&
                x <= tooltipRect.right &&
                y >= tooltipRect.top &&
                y <= tooltipRect.bottom;

            return insideTrigger || insideTooltip;
        };

        useEffect(() => {
            const node = triggerRef.current;
            if (!node) return;

            const onMouseEnter = () => showTooltip();

            const onMouseLeave = (event: MouseEvent) => {
                if (isInsideTooltipOrTrigger(event)) return;
                hideTooltip();
            };

            node.addEventListener("mouseenter", onMouseEnter);
            node.addEventListener("mouseleave", onMouseLeave);

            return () => {
                node.removeEventListener("mouseenter", onMouseEnter);
                node.removeEventListener("mouseleave", onMouseLeave);
            };
        }, []);

        useEffect(() => {
            if (!visible) return;

            const onMouseMove = (event: MouseEvent) => {
                if (!isInsideTooltipOrTrigger(event)) hideTooltip();
                else {
                    if (hideTimeout.current) {
                        clearTimeout(hideTimeout.current);
                        hideTimeout.current = null;
                    }
                }
            };

            window.addEventListener("mousemove", onMouseMove);
            return () => window.removeEventListener("mousemove", onMouseMove);
        }, [visible]);

        useEffect(() => {
            const close = () => {
                if (visible) {
                    setVisible(false);
                    if (hideTimeout.current) {
                        clearTimeout(hideTimeout.current);
                        hideTimeout.current = null;
                    }
                }
            };
            window.addEventListener("scroll", close, true);
            window.addEventListener("resize", close);
            return () => {
                window.removeEventListener("scroll", close, true);
                window.removeEventListener("resize", close);
            };
        }, [visible]);

        return (
            <TriggerRoot>
                <Component {...props} ref={triggerRef} />
                {visible &&
                    ReactDOM.createPortal(
                        <TooltipContent
                            ref={tooltipRef}
                            top={position.y}
                            left={position.x}
                        >
                            {tooltip}
                        </TooltipContent>,
                        document.body
                    )}
            </TriggerRoot>
        );
    };
