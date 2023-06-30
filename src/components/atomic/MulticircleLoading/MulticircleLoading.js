import React from 'react';
import svgMultiCircle from 'src/assets/images/loading/loading-blue.svg';

function MulticircleLoading({ size = '75px', customStyles = {} }) {
    return (
        <img
            src={svgMultiCircle}
            style={{
                width: size,
                height: size,
                ...customStyles,
            }}
            alt="svg milti circle loading"
        />
    );
}

export default MulticircleLoading;
