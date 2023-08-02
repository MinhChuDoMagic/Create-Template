import React from 'react';

function QrCode({ image }) {
    return (
        <img
            src={image}
            width="100%"
            height="100%"
            style={{
                userSelect: 'none',
            }}
        ></img>
    );
}

export default QrCode;
