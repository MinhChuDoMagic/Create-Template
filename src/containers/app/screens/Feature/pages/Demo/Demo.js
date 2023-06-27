import React, { useState } from 'react';
import './Demo.sass';
import { Button, Checkbox, Form, Input } from 'antd';
import { Box, Modal, Typography } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import { UploadTypes } from '~/app-configs';
import { useUploader } from '~/hooks/useUploader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

function Demo(props) {
    const [openModal, setOpenModal] = useState(false);

    const {
        inputRef: pdfInput,
        handleClick: handlePdfClick,
        onClick: handleHiddeninputclick,
        upload: uploadPdf,
    } = useUploader({
        type: UploadTypes.PDF,
        handleResult: initializePageAndAttachments,
    });

    function initializePageAndAttachments(pdfDetails) {
        // initialize(pdfDetails);
        // const numberOfPages = pdfDetails.pages.length;
        // resetAttachments(numberOfPages);
    }

    const hiddenDocumentInput = (
        <input
            data-testid="pdf-input"
            ref={pdfInput}
            type="file"
            name="pdf"
            id="pdf"
            accept="application/pdf"
            onChange={uploadPdf}
            onClick={handleHiddeninputclick}
            style={{ display: 'none' }}
        />
    );

    return (
        <div>
            {hiddenDocumentInput}
            <Button onClick={() => setOpenModal(true)}>Tạo template</Button>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Tạo template
                    </Typography>

                    <Form layout="vertical">
                        <Form.Item label="Tên chứng chỉ">
                            <Input placeholder="Tên chứng chỉ" />
                        </Form.Item>
                        <Form.Item valuePropName="checked">
                            <Checkbox>Sử dụng blockchain</Checkbox>
                        </Form.Item>
                        <Form.Item valuePropName="fileList">
                            <Button icon={<UploadOutlined />} onClick={handlePdfClick}>
                                Upload
                            </Button>
                        </Form.Item>
                    </Form>
                </Box>
            </Modal>
        </div>
    );
}

export default Demo;
