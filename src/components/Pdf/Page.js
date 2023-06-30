import React, { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '~/hooks/useWindowDimensions';

export const Page = ({ page, dimensions, updateDimensions, setScale }) => {
    const canvasRef = useRef(null);
    const [width, setWidth] = useState(dimensions?.width || 0);
    const [height, setHeight] = useState(dimensions?.height || 0);
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    function caculateScale(width, height) {
        return width > height
            ? Math.min((windowWidth - 475) / width, (windowHeight - 136) / height)
            : (windowHeight - 136) / height;
    }

    useEffect(() => {
        const renderPage = async (p) => {
            const _page = await p;
            if (_page) {
                const context = canvasRef.current?.getContext('2d');
                let viewport = _page.getViewport({ scale: 1 });
                const scale = caculateScale(viewport.width, viewport.height);
                setScale(scale);
                viewport = _page.getViewport({ scale });

                setWidth(viewport.width);
                setHeight(viewport.height);

                if (context) {
                    await _page.render({
                        canvasContext: canvasRef.current?.getContext('2d'),
                        viewport,
                    }).promise;

                    const newDimensions = {
                        width: viewport.width,
                        height: viewport.height,
                    };

                    updateDimensions(newDimensions);
                }
            }
        };

        renderPage(page);
    }, [page, updateDimensions, windowHeight, windowWidth]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};
