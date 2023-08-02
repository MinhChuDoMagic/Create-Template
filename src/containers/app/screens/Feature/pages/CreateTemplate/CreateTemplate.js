import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ATTACHMENT_STATUS, ATTACHMENT_TYPES, SignTypes } from '~/app-configs';
import qrCodeImage from '~/assets/images/pdf/qr-code.svg';
import Attachments from '~/components/Attachments/Attachments';
import { Page } from '~/components/Pdf/Page';
import {
    createQRAttachments,
    createSignAttachments,
    createTextAttachments,
    useAttachments,
} from '~/hooks/useAttachments';
import { usePdf } from '~/hooks/usePdf';
import { GROUP_NAMES, TOOLBAR_TYPES, useToolbars } from '~/hooks/useToolbar';
import { ggID } from '~/utils/helpers';
import { CreateTemplateButton } from '../../components/CreateTemplateButton/CreateTemplateButton';
import TemplateField from '../../components/TemplateField/TemplateField';
import Toolbars from '../../components/Toolbars/Toolbars';
import { ACTIVATE_TOOLBAR } from '../../redux/action';
import styles from './CreateTemplate.sass';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { generateJSONfromAttachment } from '~/utils/generateJSON';

let cx = classNames.bind(styles);

function CreateTemplate(props) {
    const dispatch = useDispatch();
    const template = useSelector((state) => state.feature.templateCreating);
    const {
        pageIndex,
        isMultiPage,
        isFirstPage,
        isLastPage,
        currentPage,
        previousPage,
        nextPage,
        setDimensions,
        dimensions,
        scale,
        setScale,
    } = usePdf(template.file.pages);

    const { add: addAttachments, resetAllSelectAttachment, allPageAttachments } = useAttachments();

    const { resetActivateToolbars } = useToolbars();

    function computeTextWidth(text) {
        if (text.length > 8) {
            return text.length * 7.4;
        } else {
            return text.length * 14;
        }
    }

    function addNewTextAttachments({ text, excelColumn }) {
        if (text) {
            const id = ggID();
            // Làm mới trạng thái
            resetAllSelectAttachment();
            resetActivateToolbars();

            const createdAttachment = createTextAttachments({
                id: id,
                pageIndex: pageIndex,
                width: computeTextWidth(text),
                height: 34,
                x: 10,
                y: 10,
                type: ATTACHMENT_TYPES.TEXT,
                status: ATTACHMENT_STATUS.ACTIVATE,
                excelColumn: excelColumn,
                text: text,
                options: [
                    {
                        type: TOOLBAR_TYPES.JUSTIFY_CENTER,
                        value: 'center',
                        group: {
                            isOnlySelectOne: true,
                            name: GROUP_NAMES.JUSTIFY_HORIZONTAL,
                        },
                    },
                    {
                        type: TOOLBAR_TYPES.FONTSIZE,
                        value: 14,
                        group: {
                            isOnlySelectOne: true,
                            name: GROUP_NAMES.FONTSIZE,
                        },
                    },
                    {
                        type: TOOLBAR_TYPES.FONT_FAMILY,
                        value: 'Aria',
                        group: {
                            isOnlySelectOne: true,
                            name: GROUP_NAMES.FONT_FAMILY,
                        },
                    },
                ],
            });
            addAttachments(createdAttachment);

            // Kích hoạt các toolbar mặc định
            createdAttachment.options.forEach((option) => {
                dispatch(ACTIVATE_TOOLBAR({ type: option.type, value: option.value }));
            });
        }
    }

    function addNewQRAttachments() {
        const id = ggID();
        const createdAttachment = createQRAttachments({
            id: id,
            pageIndex: pageIndex,
            width: 40,
            x: 10,
            y: 10,
            type: ATTACHMENT_TYPES.QRCODE,
            status: ATTACHMENT_STATUS.DEACTIVATE,
            QRImage: qrCodeImage,
        });
        addAttachments(createdAttachment);
    }

    function addSignAttachments({ type }) {
        const id = ggID();
        const countCurrentSignCount = allPageAttachments.filter(
            (attach) => attach.type === ATTACHMENT_TYPES.SIGN && attach.status !== ATTACHMENT_STATUS.DELETED,
        ).length;

        const createdAttachment = createSignAttachments({
            id: id,
            pageIndex: pageIndex,
            width: 150,
            height: 50,
            x: 10,
            y: 10,
            type: ATTACHMENT_TYPES.SIGN,
            signType: type ?? SignTypes.VISIBLE,
            status: ATTACHMENT_STATUS.DEACTIVATE,
            index: countCurrentSignCount + 1,
            text: `Chữ ký`,
        });
        addAttachments(createdAttachment);
    }

    function generateJSON() {
        const attachments = allPageAttachments.filter(
            (attach) => attach.status === ATTACHMENT_STATUS.ACTIVATE || attach.status === ATTACHMENT_STATUS.DEACTIVATE,
        );

        const result = generateJSONfromAttachment({
            attachments: attachments,
            pageWidth: dimensions.width,
            pageHeight: dimensions.height,
        });
        downloadJSONFile(result);
    }
    const downloadJSONFile = (jsonData) => {
        // create file in browser
        const fileName = 'template';
        const json = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + '.json';
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    return (
        <div className={cx('page')}>
            <div className={cx('sideBar')}>
                <div className={cx('containerColumn')}>
                    <TemplateField
                        addNewTextAttachments={addNewTextAttachments}
                        addNewQRAttachments={addNewQRAttachments}
                        addSignAttachments={addSignAttachments}
                    />
                </div>
                <div className={cx('container')} style={{ marginTop: '30px' }}>
                    <div className={cx('sideButtonGroup')}>
                        <CreateTemplateButton content="Xem trước" style2 />
                        <CreateTemplateButton
                            content="Xác nhận"
                            style={{ marginLeft: '12px' }}
                            onClick={generateJSON}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('mainWork')}>
                <div className={cx('toolbars')}>
                    <div className={cx('container')}>
                        <Toolbars />
                    </div>
                </div>
                <div className={cx('pdfContainer')}>
                    <div className={cx('pdfPage')}>
                        <div style={{ position: 'relative' }}>
                            <Page
                                dimensions={dimensions}
                                updateDimensions={setDimensions}
                                page={currentPage}
                                setScale={setScale}
                            />
                            {dimensions &&
                                (allPageAttachments ?? []).map((attachment, index) => {
                                    console.log('attachment: ', attachment);
                                    return (
                                        attachment.status !== ATTACHMENT_STATUS.DELETED && (
                                            <Attachments attachment={attachment} dimensions={dimensions} key={index} />
                                        )
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('changePage')}>
                <Button
                    disabled={!(isMultiPage && !isFirstPage)}
                    icon={<LeftOutlined />}
                    size="large"
                    onClick={previousPage}
                />
                <Button
                    style={{ marginLeft: '5px' }}
                    disabled={!(isMultiPage && !isLastPage)}
                    icon={<RightOutlined />}
                    size="large"
                    onClick={nextPage}
                />
            </div>
        </div>
    );
}

export default CreateTemplate;
