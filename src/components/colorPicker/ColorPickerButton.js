import React, { useState } from 'react';
import reactCSS from 'reactcss';
import { BlockPicker } from 'react-color';

const ColorPickerButton = ({ onSelect = () => {} }) => {
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
        onSelect(color);
    };

    const styles = reactCSS({
        default: {
            color: {
                width: '45px',
                height: '25px',
                borderRadius: '2px',
                background: `${color}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                border: '1px solid #333',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            popover: {
                position: 'absolute',
                margin: '10px 0px 10px -55px',
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

    return (
        <div>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color} />
            </div>

            {displayColorPicker && (
                <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose} />
                    <BlockPicker color={color} onChange={handleChange} />
                </div>
            )}
        </div>
    );
};

export default ColorPickerButton;
