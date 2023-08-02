export const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const isEmptyValue = (value) => {
    if (
        String(value) == '' ||
        value == null ||
        value == undefined ||
        JSON.stringify(value) == '{}' ||
        JSON.stringify(value) == '[]'
    ) {
        return true;
    }
    return false;
};

export const isExist = (value) => {
    return !isEmptyValue(value);
};

export const isHexColor = (color) => {
    // Regular expression to match hex color code pattern
    const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    // Check if the color matches the regex pattern
    return hexColorRegex.test(color);
};
