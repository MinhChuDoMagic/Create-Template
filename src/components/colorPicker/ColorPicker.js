import React, { useState } from 'react';
import reactCSS from 'reactcss';
import { BlockPicker } from 'react-color';
import { Col, Form, Input, Row } from 'antd';
import { isHexColor } from '~/helpers/check';

const ColorPicker = ({ side }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState('#000000');

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (newColor) => {
        setColor(newColor.hex);
    };

    const styles = reactCSS({
        default: {
            color: {
                width: '45px',
                height: '21px',
                borderRadius: '2px',
                background: `${color}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                margin: '10px 0px 10px 30px',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    const onInputChange = (e) => {
        setColor(e.target.value);
        if (isHexColor(e.target.value)) {
            setColor(e.target.value);
        }
    };

    return (
        <Form.Item labelCol={{ span: 8 }} label="Màu chữ">
            <Input.Group>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item name={[side, 'color']}>
                            <Input onChange={onInputChange} value={color} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <div style={styles.swatch} onClick={handleClick}>
                            <div style={styles.color} />
                        </div>
                    </Col>
                </Row>
            </Input.Group>

            {displayColorPicker && (
                <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose} />
                    <BlockPicker color={color} onChange={handleChange} />
                </div>
            )}
        </Form.Item>
    );
};

export default ColorPicker;
