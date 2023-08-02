import React from 'react';
import classNames from 'classnames/bind';
import styles from './Removeable.module.sass';
import closeIcon from '~/assets/images/pdf/closeable.svg';
let cx = classNames.bind(styles);

function Removeable({ children, onRemove }) {
    return (
        <div
            className={cx('removeable')}
            style={{
                userSelect: 'none',
            }}
        >
            {children}
            <div className={cx('removeable', 'top-right', 'no-background')}>
                <img
                    className={cx('closeable-icon', 'top-right')}
                    src={closeIcon}
                    alt="closeable-icon"
                    onClick={onRemove}
                />
            </div>
        </div>
    );
}

export default Removeable;
