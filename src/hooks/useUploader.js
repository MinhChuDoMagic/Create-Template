import { createRef, useState } from 'react';
import { readAsPDF } from '~/utils/asyncReader';

const handlers = {
    pdf: async (file) => {
        try {
            const pdf = await readAsPDF(file);
            return {
                file,
                name: file.name,
                pages: Array(pdf.numPages)
                    .fill(0)
                    .map((_, index) => pdf.getPage(index + 1)),
            };
        } catch (error) {
            console.log('Failed to load pdf', error);
            throw new Error('Failed to load PDF');
        }
    },
    font: async (file) => {
        try {
            return {
                file,
                name: file.name,
            };
        } catch (error) {
            console.log('Failed to load font', error);
            throw new Error('Failed to load Font');
        }
    },
};

export const useUploader = ({ type, handleResult }) => {
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = createRef();

    const onClick = (event) => {
        event.currentTarget.value = '';
    };

    const handleClick = () => {
        const input = inputRef.current;

        if (input) {
            setIsUploading(true);
            input.click();
        }
    };

    const upload = async (event) => {
        if (!isUploading) {
            return;
        }

        const files = event.currentTarget.files || (event?.dataTransfer && event?.dataTransfer.files);
        if (!files) {
            setIsUploading(false);
            return;
        }

        const file = files[0];
        const result = await handlers[type](file);
        if (handleResult) {
            handleResult(result);
        }

        setIsUploading(false);
    };

    return {
        upload,
        onClick,
        inputRef,
        handleClick,
        isUploading,
    };
};
