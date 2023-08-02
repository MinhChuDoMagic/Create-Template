import React, { useState } from 'react';
import './Demo.sass';
import { Button, Checkbox, Form, Input } from 'antd';
import { Box, Modal, Typography } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import { UploadTypes } from '~/app-configs';
import { useUploader } from '~/hooks/useUploader';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch } from 'react-redux';
import { CREATE_NEW_TEMPLATE } from '../../redux/action';
import { useAttachments } from '~/hooks/useAttachments';

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
    const history = useHistory();
    const dispatch = useDispatch();
    const [pdfFile, setPdfFile] = useState(null);
    const {
        inputRef: pdfInput,
        handleClick: handlePdfClick,
        onClick: handleHiddeninputclick,
        upload: uploadPdf,
    } = useUploader({
        type: UploadTypes.PDF,
        handleResult: handleUploadPdf,
    });
    const { reset: resetAttachments } = useAttachments();

    function handleUploadPdf(pdfDetails) {
        setPdfFile(pdfDetails);
        resetAttachments(pdfDetails.pages.length);
    }

    function createTemplateHandle(values) {
        if (pdfFile !== null) {
            dispatch(CREATE_NEW_TEMPLATE({ ...values, file: pdfFile }));
            history.push('/v');
        }
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

                    <Form
                        initialValues={{
                            useBlockchain: true,
                        }}
                        layout="vertical"
                        onFinish={createTemplateHandle}
                    >
                        <Form.Item name="name" label="Tên chứng chỉ">
                            <Input placeholder="Tên chứng chỉ" />
                        </Form.Item>
                        <Form.Item name="useBlockchain" valuePropName="checked">
                            <Checkbox>Sử dụng blockchain</Checkbox>
                        </Form.Item>

                        <Button icon={<UploadOutlined />} onClick={handlePdfClick}>
                            Upload
                        </Button>

                        {pdfFile && <h4>{pdfFile.name}</h4>}

                        <Form.Item
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Tạo template
                            </Button>
                        </Form.Item>
                    </Form>
                </Box>
            </Modal>
        </div>
    );
}

export default Demo;
