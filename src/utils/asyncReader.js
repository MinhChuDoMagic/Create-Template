import { getAsset } from './prepareAssets';

export const readAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

export const readAsPDF = async (file) => {
    const pdfjsLib = await getAsset('pdfjsLib');
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    console.log(pdfjsLib, url);
    return pdfjsLib.getDocument(url).promise;
};
