import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Resizeable.module.sass';
import { ATTACHMENT_STATUS, ATTACHMENT_TYPES } from '~/app-configs';
let cx = classNames.bind(styles);

function Resizeable({ children, attachment, updateAttachmentSize, boundedRef }) {
    const [size, setSize] = useState({
        width: attachment?.width ?? 0,
        height: attachment?.height ?? attachment?.width ?? 0,
    });

    const bottomRightHandler = (mouseDownEvent) => {
        mouseDownEvent.stopPropagation();
        const startSize = size;
        const startPosition = { width: mouseDownEvent.pageX, height: mouseDownEvent.pageY };
        const newSize = { width: size.width, height: size.height };

        function onMouseMove(mouseMoveEvent) {
            newSize.width = startSize.width - startPosition.width + mouseMoveEvent.pageX;
            newSize.height = startSize.height - startPosition.height + mouseMoveEvent.pageY;
            if (attachment.type === ATTACHMENT_TYPES.QRCODE) {
                setSize({
                    width: newSize.width,
                    height: newSize.width,
                });
                return;
            }
            setSize({
                width: newSize.width,
                height: newSize.height,
            });
        }
        function onMouseUp() {
            updateAttachmentSize(newSize.width, newSize.height);
            document.body.removeEventListener('mousemove', onMouseMove);
        }

        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp, { once: true });
    };

    function getSelectedStyle() {
        if (attachment.status === ATTACHMENT_STATUS.ACTIVATE) {
            return {
                style: {
                    border: '1px solid red',
                },
                className: 'selected',
            };
        }
        if (attachment.status === ATTACHMENT_STATUS.DEACTIVATE) {
            return {
                style: {
                    border: '1px solid #333',
                },
            };
        }
    }

    return (
        <div
            style={{
                width: size.width,
                height: size.height,
                display: 'flex',
                ...getSelectedStyle().style,
            }}
            className={cx(getSelectedStyle().className)}
        >
            <span
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                {children}
            </span>
            <div className={cx('draghandle', 'bottom-right')} onMouseDown={bottomRightHandler}></div>
            {/* <div className={cx('draghandle', 'top-right')} onMouseDown={bottomRightHandler}></div>
            <div className={cx('draghandle', 'bottom-left')} onMouseDown={bottomRightHandler}></div>
            <div className={cx('draghandle', 'top-left')} onMouseDown={bottomRightHandler}></div> */}
        </div>
    );
}
export default Resizeable;
