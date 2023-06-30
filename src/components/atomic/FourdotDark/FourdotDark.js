import React from 'react';
import fourDotDark from 'src/assets/images/loading/four-dot-dark.svg';

function FourdotDark({ size = '75px', customStyles = {} }) {
    return (
        <img
            src={fourDotDark}
            style={{
                width: size,
                height: size,
                ...customStyles,
            }}
            alt="svg milti circle loading"
        />
    );
}

export default FourdotDark;
