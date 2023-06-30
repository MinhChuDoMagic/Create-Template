import { Checkbox, Form, Input, InputNumber, Select } from 'antd';
import styles from './CreateTemplate.sass';
import classNames from 'classnames/bind';
import { useState } from 'react';
import AppButton, { BUTTON_COLOR } from '~/components/atomic/AppButton/AppButton';
import ColorPicker from '~/components/colorPicker/ColorPicker';
import { useSelector } from 'react-redux';
import { usePdf } from '~/hooks/usePdf';
import { Page } from '~/components/Pdf/Page';
import Toolbars from '../../components/Toolbars/Toolbars';

let cx = classNames.bind(styles);

function CreateTemplate(props) {
    const template = useSelector((state) => state.feature.templateCreating);
    console.log(template);
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
    const [fieldOption, setFieldOption] = useState('text');
    return (
        <div className={cx('page')}>
            <div className={cx('sideBar')}>
                <div className={cx('containerColumn')}>
                    <FieldOptions option={fieldOption} setOption={setFieldOption} />
                    {fieldOption === 'text' && <TextFieldOption />}
                    <Button content="Xác nhận" style2 style={{ marginTop: '30px' }} />
                </div>
                <div className={cx('container')} style={{ marginTop: '30px' }}>
                    <div className={cx('sideButtonGroup')}>
                        <Button content="Xem trước" style2 />
                        <Button content="Xác nhận" style={{ marginLeft: '12px' }} />
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
                        <Page
                            dimensions={dimensions}
                            updateDimensions={setDimensions}
                            page={currentPage}
                            setScale={setScale}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FieldOptions({ option, setOption }) {
    return (
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
            <Select.Option key="text">
                <div style={{ color: '#1B709B' }}>Thêm trường chữ</div>
            </Select.Option>
            <Select.Option key="sign">
                <div style={{ color: '#1B709B' }}>Thêm trường ký</div>
            </Select.Option>
            <Select.Option key="qr">
                <div style={{ color: '#1B709B' }}>Thêm mã qr</div>
            </Select.Option>
        </Select>
    );
}

function Button({ content, onClick, style2, style, ...rest }) {
    return (
        <AppButton
            buttonStyle={style2 === true ? BUTTON_COLOR.BLUE : null}
            onClick={onClick}
            style={{ ...style, width: '130px', height: '48px' }}
            {...rest}
        >
            {content}
        </AppButton>
    );
}

function TextFieldOption({ onFinish }) {
    return (
        <Form labelCol={{ span: 8 }} layout="horizontal" onFinish={onFinish} style={{ marginTop: '20px' }}>
            <Form.Item label="Tên trường">
                <Input
                    placeholder="Nhập tên trường"
                    // className={cx('input-template-name')}
                ></Input>
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input
                    placeholder="Nhập mô tả"
                    // className={cx('input-template-name')}
                ></Input>
            </Form.Item>
            <Form.Item label="Dữ liệu mẫu">
                <Input
                    placeholder="Nhập dữ liệu mẫu"
                    // className={cx('input-template-name')}
                ></Input>
            </Form.Item>
            <AdditionalOption />
        </Form>
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
            {leftAdditional && <AdditionalSetting />}
            <br />
            <Checkbox checked={rightAdditional} onChange={onRightChange}>
                Giá trị thêm bên phải
            </Checkbox>
            {rightAdditional && <AdditionalSetting />}
        </div>
    );
}

function AdditionalSetting() {
    return (
        <div style={{ marginTop: '10px' }}>
            <Form.Item label="Nội dung">
                <Input placeholder="Nhập nội dung"></Input>
            </Form.Item>
            <Form.Item label="Font">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="hehe">Hemo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Kích cỡ" rules={[{ type: 'number', min: 0, max: 99 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Khoảng cách" rules={[{ type: 'number', min: 0, max: 99 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Màu chữ">
                <ColorPicker />
            </Form.Item>
        </div>
    );
}

export default CreateTemplate;
