import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS, { GLASS_EFFECT } from "../../styles/colors";
import Column from "../Column";
import SPACINGS from "../../styles/spacings";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { columnsSelector, moveColumn } from "../../redux/columns/reducer";
import Header from "../Header";
import { ColumnDraggable } from "../../types";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { columnsAllSelector } from "../../redux/columns/selectors";

const Root = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${COLORS.white};
    padding: ${SPACINGS.xs};
    background: ${COLORS.backgroundGradient};
    padding: ${SPACINGS.xs};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: ${SPACINGS.sm};
    padding: ${SPACINGS.xs};
    overflow: hidden;
    border-radius: ${SPACINGS.sm};
    border: 1px solid ${COLORS.border};
    ${GLASS_EFFECT};
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${SPACINGS.sm};
    width: 100%;
    height: 100%;
    overflow-y: hidden;
`;

const Board: React.FC = () => {
    const columns = useAppSelector(columnsAllSelector());
    const contentRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!contentRef.current) return;

        return dropTargetForElements({
            element: contentRef.current,
            canDrop: ({ source }) => source.data?.type === "column",
            onDrop: ({ source, location }) => {
                const columnEl = contentRef.current;
                if (!columnEl || !source.data) return;
                const { order, columnId } = source.data as ColumnDraggable;
                const taskElements = Array.from(
                    columnEl.querySelectorAll<HTMLElement>("[data-column-id]")
                );
                let newOrder = taskElements.length + 1;
                const dropX = location.current.input.clientX;
                const beforeTask = taskElements.find((el) => {
                    const taskContainer = el.getBoundingClientRect();
                    return dropX < taskContainer.left + taskContainer.width / 2;
                });
                if (beforeTask) {
                    const index = taskElements.findIndex(
                        (el) =>
                            el.dataset.columnId === beforeTask.dataset.columnId
                    );
                    newOrder = index + 1;
                }
                console.log("Move column", { columnId, order, newOrder });

                dispatch(
                    moveColumn({
                        id: columnId,
                        order,
                        newOrder,
                    })
                );
            },
        });
    }, [dispatch]);

    console.log("Columns", columns);

    return (
        <Root>
            <Wrapper>
                <Header />
                <ContentWrapper ref={contentRef}>
                    {columns?.map((props) => (
                        <Column {...props} key={props.id} />
                    ))}
                </ContentWrapper>
            </Wrapper>
        </Root>
    );
};

export default Board;
