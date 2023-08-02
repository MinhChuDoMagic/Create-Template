import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { STYLES_DICTIONARY } from '~/hooks/useToolbar';
import styles from './Styleable.module.sass';
import { ATTACHMENT_STATUS } from '~/app-configs';
let cx = classNames.bind(styles);

function Styleable({ attachment, onSelectAttachment, onDeSelectAttachment, removeOtherSelectAttachment }) {
    function handleEdit() {
        if (attachment.status === ATTACHMENT_STATUS.ACTIVATE) {
            onDeSelectAttachment();
            return;
        }

        if (attachment.status === ATTACHMENT_STATUS.DEACTIVATE) {
            removeOtherSelectAttachment();
            onSelectAttachment();
            return;
        }
    }

    function getComponentStyle() {
        let result = {};
        (attachment.options ?? []).map((option) => {
            result = { ...result, ...STYLES_DICTIONARY[option.type](option.value).cssStyle };
        });
        return result;
    }

    return (
        <div
            onDoubleClick={handleEdit}
            style={{
                ...getComponentStyle(),
                alignItems: 'center',
            }}
            className={cx('editable')}
        >
            <span>{attachment.text}</span>
        </div>
    );
}

export default memo(Styleable);
