import React from 'react';
import fourDotLight from 'src/assets/images/loading/four-dot-light.svg';

function FourdotLight({ size = '75px', customStyles = {} }) {
    return (
        <img
            src={fourDotLight}
            style={{
                width: size,
                height: size,
                ...customStyles,
            }}
            alt="svg milti circle loading"
        />
    );
}

export default FourdotLight;
