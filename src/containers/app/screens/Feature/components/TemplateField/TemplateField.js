import { Button, Checkbox, Divider, Form, Input, InputNumber, Select } from 'antd';
import React, { useState } from 'react';
import { ATTACHMENT_TYPES, SignTypes, UploadTypes } from '~/app-configs';
import ColorPicker from '~/components/colorPicker/ColorPicker';
import { CreateTemplateButton } from '../CreateTemplateButton/CreateTemplateButton';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useUploader } from '~/hooks/useUploader';
import { ADD_FONT } from '../../redux/action';

export default function TemplateField({
    addNewTextAttachments = ({ content }) => {},
    addNewQRAttachments = () => {},
    addSignAttachments = ({ type }) => {},
}) {
    function handleSubmitForm(data) {
        if (data.type === ATTACHMENT_TYPES.TEXT) {
            addNewTextAttachments({
                text: data.description,
                excelColumn: data.fieldName,
            });
        }
        if (data.type === ATTACHMENT_TYPES.QRCODE) {
            addNewQRAttachments();
        }
        if (data.type === ATTACHMENT_TYPES.SIGN) {
            addSignAttachments({ type: SignTypes.VISIBLE });
        }
    }

    const [fieldOption, setFieldOption] = useState(ATTACHMENT_TYPES.TEXT);

    return (
        <Form
            initialValues={{ type: ATTACHMENT_TYPES.TEXT, left: { color: '#000000' }, right: { color: '#000000' } }}
            onFinish={handleSubmitForm}
        >
            <FieldOptions option={fieldOption} setOption={setFieldOption} />
            {fieldOption === ATTACHMENT_TYPES.TEXT && <TextFieldOption />}
            <CreateTemplateButton content="Xác nhận" style2 style={{ marginTop: '30px' }} type="submit" />
        </Form>
    );
}

function FieldOptions({ option, setOption }) {
    return (
        <Form.Item name="type">
            <Select
                value={option}
                style={{
                    width: '100%',
                }}
                bordered
                size="large"
                onChange={(value, e) => {
                    setOption(value);
                }}
            >
                <Select.Option key={ATTACHMENT_TYPES.TEXT}>
                    <div style={{ color: '#1B709B' }}>Thêm trường chữ</div>
                </Select.Option>
                <Select.Option key={ATTACHMENT_TYPES.SIGN}>
                    <div style={{ color: '#1B709B' }}>Thêm trường ký</div>
                </Select.Option>
                <Select.Option key={ATTACHMENT_TYPES.QRCODE}>
                    <div style={{ color: '#1B709B' }}>Thêm mã qr</div>
                </Select.Option>
            </Select>
        </Form.Item>
    );
}

function TextFieldOption() {
    return (
        <div style={{ marginTop: '20px' }}>
            <Form.Item labelCol={{ span: 8 }} label="Tên trường" name="fieldName">
                <Input placeholder="Nhập tên trường" />
            </Form.Item>
            <Form.Item labelCol={{ span: 8 }} label="Mô tả" name="description">
                <Input placeholder="Nhập mô tả" />
            </Form.Item>
            <Form.Item labelCol={{ span: 8 }} label="Dữ liệu mẫu" name="sampleData">
                <Input placeholder="Nhập dữ liệu mẫu" />
            </Form.Item>
            <AdditionalOption />
        </div>
    );
}

function AdditionalOption() {
    const [leftAdditional, setLeftAdditional] = useState(false);
    const [rightAdditional, setRightAdditional] = useState(false);

    const onLeftChange = (e) => {
        setLeftAdditional(e.target.checked);
    };

    const onRightChange = (e) => {
        setRightAdditional(e.target.checked);
    };

    return (
        <div>
            <Checkbox checked={leftAdditional} onChange={onLeftChange}>
                Giá trị thêm bên trái
            </Checkbox>
            {leftAdditional && <AdditionalSetting side="left" />}
            <br />
            <Checkbox checked={rightAdditional} onChange={onRightChange}>
                Giá trị thêm bên phải
            </Checkbox>
            {rightAdditional && <AdditionalSetting side="right" />}
        </div>
    );
}

function AdditionalSetting({ side }) {
    const listFont = useSelector((state) => state.feature.fonts.fontName);
    const dispatch = useDispatch();

    const {
        inputRef: fontInput,
        handleClick: handleFontClick,
        onClick: onClickFont,
        upload: uploadFont,
    } = useUploader({
        type: UploadTypes.FONT,
        handleResult: initializeFont,
    });

    function initializeFont(fontDetails) {
        dispatch(ADD_FONT(fontDetails));
    }

    const hiddenFontInputs = (
        <input
            data-testid="font-input"
            ref={fontInput}
            type="file"
            name="font"
            id="font"
            accept=".ttf"
            onChange={uploadFont}
            onClick={onClickFont}
            style={{ display: 'none' }}
        />
    );

    return (
        <div style={{ marginTop: '10px' }}>
            <Form.Item name={[side, 'textContent']} label="Nội dung" labelCol={{ span: 8 }}>
                <Input placeholder="Nhập nội dung"></Input>
            </Form.Item>
            <Form.Item name={[side, 'fontName']} label="Font" labelCol={{ span: 8 }}>
                {hiddenFontInputs}
                <Select dropdownRender={(menu) => <CustomDropdown menu={menu} handleFontClick={handleFontClick} />}>
                    {listFont.map((fontName) => (
                        <Select.Option key={fontName + side} value={fontName}>
                            {fontName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name={[side, 'textSize']}
                labelCol={{ span: 8 }}
                label="Kích cỡ"
                rules={[{ type: 'number', min: 0, max: 99 }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name={[side, 'distanceFromMainText']}
                labelCol={{ span: 8 }}
                label="Khoảng cách"
                rules={[{ type: 'number', min: 0, max: 99 }]}
            >
                <InputNumber />
            </Form.Item>

            <ColorPicker side={side} />
        </div>
    );
}

const CustomDropdown = ({ menu, handleFontClick }) => (
    <>
        {menu}
        <Divider style={{ margin: '8px 0 0 0' }} />
        <Button type="text" icon={<PlusOutlined />} onClick={handleFontClick} style={{ width: '100%' }}>
            Thêm font
        </Button>
    </>
);
