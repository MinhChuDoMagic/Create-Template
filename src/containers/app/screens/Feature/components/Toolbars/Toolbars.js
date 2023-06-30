import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Toolbars.module.sass';
import { TOOLBAR_STATUS, useToolbars } from '~/hooks/useToolbar';
import { useSelector } from 'react-redux';
let cx = classNames.bind(styles);

function Toolbars({ selectedAttachment }) {
    const { listToolbars, initializeToolbars } = useToolbars();

    useEffect(() => {
        initializeToolbars();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                // marginTop: '8px',
                padding: '12px 20px',
                // border: '1px solid #333',
                // marginBottom: '10px',
                width: 'fit-content',
            }}
        >
            {listToolbars.map((toolbar) => {
                return (
                    <div
                        className={cx('toolbar-component')}
                        key={toolbar.type}
                        style={{
                            userSelect: 'none',
                        }}
                    >
                        {toolbar.component(toolbar, listToolbars, selectedAttachment)}
                    </div>
                );
            })}
        </div>
    );
}

export default Toolbars;
