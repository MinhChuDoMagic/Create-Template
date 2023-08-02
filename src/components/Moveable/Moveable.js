import React, { useState } from 'react';
import { useRef } from 'react';
import { getMovePosition } from '~/utils/helpers';

export const MouseActions = {
    MOVE: 'MOVE',
    NO_MOVEMENT: 'NO_MOVEMENT',
};

function Moveable({ children, x = 0, y = 0, width, height, pageHeight, pageWidth, updateAttachmentPosition }) {
    const isMouseDown = useRef(false);
    const [positionTop, setPositionTop] = useState(y);
    const [positionLeft, setPositionLeft] = useState(x);
    const [operation, setOperation] = useState(MouseActions.NO_MOVEMENT);
    const handleMouseMove = (event) => {
        event.preventDefault();

        if (isMouseDown.current) {
            setOperation(MouseActions.MOVE);
            const { top, left } = getMovePosition(
                positionLeft,
                positionTop,
                event.movementX,
                event.movementY,
                width,
                height,
                pageWidth,
                pageHeight,
            );

            setPositionTop(top);
            setPositionLeft(left);
        }
    };

    const handleMousedown = () => {
        isMouseDown.current = true;
    };
    const handleMouseUp = (event) => {
        event.preventDefault();
        isMouseDown.current = false;
        if (operation === MouseActions.MOVE) {
            setOperation(MouseActions.NO_MOVEMENT);
            const { top, left } = getMovePosition(
                positionLeft,
                positionTop,
                event.movementX,
                event.movementY,
                width,
                height,
                pageWidth,
                pageHeight,
            );
            if (x !== top && y !== left) {
                updateAttachmentPosition(top, left);
            }
        }
    };

    const handleMouseOut = (event) => {
        if (operation === MouseActions.MOVE) {
            handleMouseUp(event);
        }
    };

    function handleKeyPress(event) {
        console.log('event: ', event);
    }

    function getCursor() {
        switch (operation) {
            case MouseActions.MOVE:
                return 'move';
            default:
                return 'default';
        }
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: positionTop,
                left: positionLeft,
                cursor: getCursor(),
            }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMousedown}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseOut}
            onKeyUp={handleKeyPress}
        >
            {children}
        </div>
    );
}

export default Moveable;
