export function CREATE_NEW_TEMPLATE(payload) {
    return {
        type: 'CREATE_NEW_TEMPLATE',
        payload,
    };
}

export function UPDATE_NEW_TEMPLATE(payload) {
    return {
        type: 'UPDATE_NEW_TEMPLATE',
        payload,
    };
}

export function CREATE_ATTACHMENT(payload) {
    return {
        type: 'CREATE_ATTACHMENT',
        payload,
    };
}

export function REMOVE_ATTACHMENT(payload) {
    return {
        type: 'REMOVE_ATTACHMENT',
        payload,
    };
}

export function UPDATE_ATTACHMENT(payload) {
    return {
        type: 'UPDATE_ATTACHMENT',
        payload,
    };
}

export function SELECT_ATTACHMENT_BY_ID(payload) {
    return {
        type: 'SELECT_ATTACHMENT_BY_ID',
        payload,
    };
}

export function DESELECT_ATTACHMENT_BY_ID(payload) {
    return {
        type: 'DESELECT_ATTACHMENT_BY_ID',
        payload,
    };
}

export function RESET_SELECT_ATTACHMENTS(payload) {
    return {
        type: 'RESET_SELECT_ATTACHMENTS',
        payload,
    };
}

export function RESET_PAGE_ATTACHMENTS_STATE(payload) {
    return {
        type: 'RESET_PAGE_ATTACHMENTS_STATE',
        payload,
    };
}

// Toolbars
export function SET_TOOLBARS(payload) {
    return {
        type: 'SET_TOOLBARS',
        payload,
    };
}

export function ACTIVATE_TOOLBAR(payload) {
    return {
        type: 'ACTIVATE_TOOLBAR',
        payload,
    };
}

export function DEACTIVATE_TOOLBAR(payload) {
    return {
        type: 'DEACTIVATE_TOOLBAR',
        payload,
    };
}

export function RESET_ACTIVATE_TOOLBARS(payload) {
    return {
        type: 'RESET_ACTIVATE_TOOLBARS',
        payload,
    };
}

export function ADD_FONT(payload) {
    return {
        type: 'ADD_FONT',
        payload,
    };
}
