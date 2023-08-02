import React from 'react';

function Sign({ text }) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            {text}
        </div>
    );
}

export default Sign;
