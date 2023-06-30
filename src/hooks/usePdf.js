import { useState, useCallback } from 'react';
import { save } from '~/utils/pdf';

export const usePdf = (_pages) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [dimensions, setDimensions] = useState();
    const pages = _pages ?? [];
    const isMultiPage = _pages.length > 1;
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(_pages.length === 1);
    const currentPage = pages[pageIndex];
    const [scale, setScale] = useState(1);

    const setDimensionsHandler = useCallback(setDimensions, [setDimensions]);

    const nextPage = () => {
        const newPageIndex = pageIndex + 1;
        setPageIndex(pageIndex + 1);
        setIsFirstPage(newPageIndex === 0);
        setIsLastPage(newPageIndex === pages.length - 1);
    };

    const previousPage = () => {
        const newPageIndex = pageIndex - 1;
        setPageIndex(newPageIndex);
        setIsFirstPage(newPageIndex === 0);
        setIsLastPage(newPageIndex === pages.length - 1);
    };

    return {
        currentPage,
        dimensions,
        setDimensions: setDimensionsHandler,
        pageIndex,
        setPageIndex,
        nextPage,
        isMultiPage,
        previousPage,
        isFirstPage,
        isLastPage,
        scale,
        setScale,
    };
};
