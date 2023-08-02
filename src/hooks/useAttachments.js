import { useDispatch, useSelector } from 'react-redux';
import {
    ACTIVATE_TOOLBAR,
    CREATE_ATTACHMENT,
    DEACTIVATE_TOOLBAR,
    DESELECT_ATTACHMENT_BY_ID,
    REMOVE_ATTACHMENT,
    RESET_ACTIVATE_TOOLBARS,
    RESET_PAGE_ATTACHMENTS_STATE,
    RESET_SELECT_ATTACHMENTS,
    SELECT_ATTACHMENT_BY_ID,
    UPDATE_ATTACHMENT,
} from '~/containers/app/screens/Feature/redux/action';
import qrCodeImage from '~/assets/images/pdf/qr-code.svg';
import { isExist } from '~/helpers/check';
import { ATTACHMENT_TYPES, SignTypes } from '~/app-configs';

export const createTextAttachments = ({
    id,
    pageIndex,
    width,
    height,
    x,
    y,
    type = ATTACHMENT_TYPES.TEXT,
    text,
    excelColumn,
    options = [],
    status,
}) => {
    return {
        id,
        pageIndex,
        width,
        height,
        x,
        y,
        type,
        text,
        excelColumn,
        status,
        options,
    };
};

export const createQRAttachments = ({
    id,
    pageIndex,
    width = 40,
    x,
    y,
    type = ATTACHMENT_TYPES.QRCODE,
    QRImage = qrCodeImage,
    status,
}) => {
    return {
        id,
        pageIndex,
        width,
        x,
        y,
        type,
        QRImage,
        status,
    };
};

export const createSignAttachments = ({
    id,
    pageIndex,
    width = 150,
    height = 50,
    x,
    y,
    type = ATTACHMENT_TYPES.SIGN,
    text = 'Chữ ký',
    signType = SignTypes.VISIBLE,
    status,
    index,
}) => {
    return {
        id,
        pageIndex,
        width,
        height,
        x,
        y,
        type,
        signType,
        text,
        status,
        index,
    };
};

export const useAttachments = () => {
    const dispatch = useDispatch();
    const allPageAttachments = useSelector((state) => state.feature.allPageAttachments);

    const add = (newAttachment) => dispatch(CREATE_ATTACHMENT({ newAttachment }));
    const remove = (attachmentId) => {
        console.log(attachmentId);
        console.log(isExist(attachmentId));
        console.log('' == 0);
        if (isExist(attachmentId)) dispatch(REMOVE_ATTACHMENT({ attachmentId }));
    };
    const update = (attachmentId, attachment) => {
        if (isExist(attachmentId)) {
            dispatch(UPDATE_ATTACHMENT({ attachmentId, attachment }));
        }
    };
    const onSelectAttachment = (attachmentId, options) => {
        if (isExist(attachmentId)) {
            dispatch(SELECT_ATTACHMENT_BY_ID({ attachmentId }));
        }
        // Interact with toolbar
        dispatch(RESET_ACTIVATE_TOOLBARS());
        (options ?? []).forEach((option) => {
            dispatch(ACTIVATE_TOOLBAR({ type: option.type, value: option.value }));
        });
    };

    const onDeSelectAttachment = (attachmentId, options) => {
        if (isExist(attachmentId)) {
            dispatch(DESELECT_ATTACHMENT_BY_ID({ attachmentId }));
        }

        // Interact with toolbar
        dispatch(RESET_ACTIVATE_TOOLBARS());
    };

    const resetAllSelectAttachment = () => dispatch(RESET_SELECT_ATTACHMENTS());
    const resetAllPageAttachments = () => dispatch(RESET_PAGE_ATTACHMENTS_STATE());
    const reset = () => {
        resetAllPageAttachments();
    };

    return {
        add,
        reset,
        remove,
        update,
        onSelectAttachment,
        onDeSelectAttachment,
        resetAllSelectAttachment,
        allPageAttachments: allPageAttachments.data,
    };
};
