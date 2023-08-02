import classNames from 'classnames/bind';
import { useAttachments } from '~/hooks/useAttachments';
import Moveable from '../Moveable/Moveable';
import Removeable from '../Removeable/Removeable';
import Resizeable from '../Resizeable/Resizeable';
import styles from './Attachment.module.sass';
import QrCode from './components/QrCode/QrCode';
import Sign from './components/Sign/Sign';
import Styleable from './components/Styleable/Styleable';
import { ATTACHMENT_TYPES } from '~/app-configs';
let cx = classNames.bind(styles);

function Attachments({ attachment, dimensions }) {
    const {
        add: addAttachments,
        reset: resetAttachments,
        remove: removeAttachments,
        update: updateAttachment,
        onSelectAttachment,
        onDeSelectAttachment,
        resetAttachmentById,
        resetAllSelectAttachment,
        allPageAttachments,
        selectedAttachments,
    } = useAttachments();

    function updateAttachmentPosition(x, y, attachment) {
        updateAttachment(attachment.id, { ...attachment, x: x, y: y });
    }

    function updateAttachmentSize(width, height, attachment) {
        updateAttachment(attachment.id, { ...attachment, width, height });
    }

    function decreaseSignIndex(attachment) {
        if (attachment.type === ATTACHMENT_TYPES.SIGN) {
            allPageAttachments.forEach((attach, index) => {
                if (attach.type === ATTACHMENT_TYPES.SIGN && attach.index > attachment.index) {
                    updateAttachment(attach.id, { ...attach, index: attach.index - 1 });
                }
            });
        }
    }

    return (
        <Moveable
            pageWidth={dimensions.width}
            pageHeight={dimensions.height}
            updateAttachmentPosition={(x, y) => updateAttachmentPosition(x, y, attachment)}
            x={attachment.x}
            y={attachment.y}
            width={attachment.width}
            height={attachment.height}
        >
            <Removeable
                onRemove={() => {
                    removeAttachments(attachment.id);
                    decreaseSignIndex(attachment);
                }}
            >
                <Resizeable
                    attachment={attachment}
                    updateAttachmentSize={(width, height) => updateAttachmentSize(width, height, attachment)}
                >
                    {attachment.type === ATTACHMENT_TYPES.SIGN && (
                        <Sign text={`${attachment?.text} ${attachment?.index}`} />
                    )}

                    {attachment.type === ATTACHMENT_TYPES.QRCODE && (
                        <QrCode
                            image={attachment.QRImage}
                            attachment={attachment}
                            onSelectAttachment={() => onSelectAttachment(attachment.id, attachment.options)}
                            onDeSelectAttachment={() => onDeSelectAttachment(attachment.id, attachment.options)}
                            removeOtherSelectAttachment={() => resetAllSelectAttachment(attachment)}
                        />
                    )}

                    {attachment.type === ATTACHMENT_TYPES.TEXT && (
                        <Styleable
                            attachment={attachment}
                            onSelectAttachment={() => onSelectAttachment(attachment.id, attachment.options)}
                            onDeSelectAttachment={() => onDeSelectAttachment(attachment.id, attachment.options)}
                            removeOtherSelectAttachment={() => resetAllSelectAttachment(attachment)}
                        />
                    )}
                </Resizeable>
            </Removeable>
        </Moveable>
    );
}

export default Attachments;
