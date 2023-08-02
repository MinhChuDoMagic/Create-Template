import { ATTACHMENT_TYPES } from '~/app-configs';
import { TOOLBAR_TYPES } from '~/hooks/useToolbar';

export const SIGN_INDEX_TEXTS = ['first', 'second', 'third', 'fourth', 'fifth', 'six', 'seven', 'eight', 'nine', 'ten'];

function transformMyCoordinateToSignCoordinate({ x, y }) {
    return {
        x: y,
        y: x,
    };
}

function transformMyCoordinateToPdfLibCoordinate({ x, y, pageHeight, pageWidth, attactHeight, attachWidth }) {
    return {
        x: y,
        y: pageHeight - x - attactHeight,
        width: pageWidth,
        height: pageHeight,
    };
}

export function generateJSONfromAttachment({ attachments, pageWidth, pageHeight }) {
    console.log('pageHeight: ', pageHeight);
    console.log('pageWidth: ', pageWidth);
    console.log('attachments: ', attachments);
    const listExcelAttachs = [];
    const listSignAttachs = [];
    const listQRAttachs = [];
    attachments.forEach((attachment, index) => {
        if (attachment.type === ATTACHMENT_TYPES.TEXT) {
            listExcelAttachs.push(attachment);
        }
        if (attachment.type === ATTACHMENT_TYPES.SIGN) {
            listSignAttachs.push(attachment);
        }
        if (attachment.type === ATTACHMENT_TYPES.QRCODE) {
            listQRAttachs.push(attachment);
        }
    });
    console.log('listExcelAttachs: ', listExcelAttachs);
    console.log('listSignAttachs: ', listSignAttachs);
    console.log('listQRAttachs: ', listQRAttachs);
    // generate_SignMetadata
    const signMetadata = {
        signType: [],
        signPosition: [],
    };
    listSignAttachs
        .sort((a, b) => a.index > b.index)
        .forEach((signAttach) => {
            signMetadata.signType.push([signAttach.signType]);

            signMetadata.signPosition.push([
                {
                    id: `${signAttach.id}`,
                    pageIndex: 0,
                    x: transformMyCoordinateToSignCoordinate({
                        x: signAttach.x,
                        y: signAttach.y,
                    }).x,
                    y: transformMyCoordinateToSignCoordinate({
                        x: signAttach.x,
                        y: signAttach.y,
                    }).y,
                    width: signAttach.width,
                    height: signAttach.height,
                    pageHeight: pageHeight,
                    fieldName: SIGN_INDEX_TEXTS[signAttach.index - 1],
                },
            ]);
        });
    // generate_qrcode
    const selectedQrCode = listQRAttachs[0];
    const qrcode = selectedQrCode
        ? {
              x: transformMyCoordinateToPdfLibCoordinate({
                  x: selectedQrCode.x,
                  y: selectedQrCode.y,
                  pageWidth: pageWidth,
                  pageHeight: pageHeight,
                  attachWidth: selectedQrCode.width,
                  attactHeight: selectedQrCode.height,
              }).x,
              y: transformMyCoordinateToPdfLibCoordinate({
                  x: selectedQrCode.x,
                  y: selectedQrCode.y,
                  pageWidth: pageWidth,
                  pageHeight: pageHeight,
                  attachWidth: selectedQrCode.width,
                  attactHeight: selectedQrCode.height,
              }).y,
              width: selectedQrCode?.width,
              height: selectedQrCode?.width,
              // TODO
              scaleRate: 0.5,
          }
        : {};

    // generate_ExcelField
    const fieldName = {};
    const valueFieldSettings = {};
    listExcelAttachs.forEach((excelAttach) => {
        fieldName[excelAttach.excelColumn] = excelAttach.text;
        const fontSize = excelAttach.options.find((option) => option.type === TOOLBAR_TYPES.FONTSIZE);
        const fontFamily = excelAttach.options.find((option) => option.type === TOOLBAR_TYPES.FONT_FAMILY);
        const pdfLifCoordinate = transformMyCoordinateToPdfLibCoordinate({
            x: excelAttach.x,
            y: excelAttach.y,
            pageHeight: pageHeight,
            attactHeight: excelAttach.height,
            attachWidth: excelAttach.width,
        });
        console.log('excelAttach: ', excelAttach);
        console.log('pdfLifCoordinate: ', pdfLifCoordinate);
        const fieldSetting = {
            name: excelAttach.excelColumn,
            // TODO
            fontName: fontFamily.value,
            textSize: fontSize.value,
            x: {
                left: pdfLifCoordinate.x,
                center: pdfLifCoordinate.x + excelAttach.width / 2,
                right: pdfLifCoordinate.x + excelAttach.width,
            },
            y: {
                left: pdfLifCoordinate.y,
                center: pdfLifCoordinate.y,
                right: pdfLifCoordinate.y,
            },
            options: {
                color: '#000000',
            },
            typeX: 'left',
            typeY: 'center',
            // TODO:
            widthLimitation: pdfLifCoordinate.x + excelAttach.width,
            minMargin: 150,
        };
        valueFieldSettings[excelAttach.excelColumn] = [fieldSetting];
    });
    return {
        institution: {
            $oid: '6356e719fd49bfa42e40b0b9',
        },
        uploader: [
            {
                $oid: '63359dc573fa903db0fd8deb',
            },
        ],
        signer: [
            [
                {
                    $oid: '63359e7e73fa903db0fd8e07',
                },
            ],
            [
                {
                    $oid: '6327e9cfc131d15e8b51000d',
                },
            ],
        ],
        publisher: [
            {
                $oid: '63359d9573fa903db0fd8de4',
            },
        ],
        signMetadata,
        name: 'Sun Demo',
        description: 'Mẫu bằng Sun',
        effectiveTime: 63113852,
        signTimesCount: listSignAttachs.length,
        useBlockchain: false,
        fileName: 'sun.edtech.pdf',
        keyFieldSettings: valueFieldSettings,
        qrcode,
        valueFieldSettings: valueFieldSettings,
        fieldName: fieldName,
        previewUrl: 'https://i.imgur.com/SnlelGl.png',
    };
}
