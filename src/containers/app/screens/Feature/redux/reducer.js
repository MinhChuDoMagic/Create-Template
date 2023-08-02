import { combineReducers } from 'redux';
import {
    CREATE_NEW_TEMPLATE,
    UPDATE_NEW_TEMPLATE,
    CREATE_ATTACHMENT,
    DESELECT_ATTACHMENT_BY_ID,
    DEACTIVATE_TOOLBAR,
    REMOVE_ATTACHMENT,
    RESET_PAGE_ATTACHMENTS_STATE,
    RESET_SELECT_ATTACHMENTS,
    SELECT_ATTACHMENT_BY_ID,
    ACTIVATE_TOOLBAR,
    SET_TOOLBARS,
    UPDATE_ATTACHMENT,
    RESET_ACTIVATE_TOOLBARS,
    ADD_FONT,
} from './action';
import { REQUEST_STATE, ATTACHMENT_STATUS } from '~/app-configs';
import { isEmptyValue, isExist } from '~/helpers/check';
import { TOOLBAR_STATUS } from '~/hooks/useToolbar';

const defaultState = {
    state: null,
    data: [],
};

const defaultFont = { fontName: ['Aria', 'Roboto', 'Times New Roman'], fontFile: {} };

export default combineReducers({
    templateCreating: (state = defaultState, action) => {
        switch (action.type) {
            case CREATE_NEW_TEMPLATE().type: {
                return {
                    ...action.payload,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case UPDATE_NEW_TEMPLATE().type: {
                return {
                    ...state,
                    ...action.payload,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            default:
                return state;
        }
    },
    toolbars: (state = { list: [] }, action) => {
        switch (action.type) {
            case SET_TOOLBARS().type: {
                const { listToolbars } = action.payload;
                return {
                    ...state,
                    list: listToolbars ?? {},
                };
            }
            case ACTIVATE_TOOLBAR().type: {
                const { type, group } = action.payload;
                const newListToolbars = state.list.map((toolbar) => {
                    if (toolbar?.group?.name === group?.name && group.isOnlySelectOne) {
                        toolbar.status = TOOLBAR_STATUS.DEACTIVATE;
                    }
                    if (toolbar.type === type) {
                        toolbar.status = TOOLBAR_STATUS.ACTIVATE;
                    }
                    // Nếu cùng 1 group thì disable trên UI
                    return toolbar;
                });
                return {
                    ...state,
                    list: newListToolbars,
                };
            }
            case DEACTIVATE_TOOLBAR().type: {
                const { type } = action.payload;
                const newListToolbars = state.list.map((toolbar) => {
                    if (toolbar.type === type) {
                        toolbar.status = TOOLBAR_STATUS.DEACTIVATE;
                    }
                    return toolbar;
                });
                return {
                    ...state,
                    list: newListToolbars,
                };
            }
            case RESET_ACTIVATE_TOOLBARS().type: {
                const newListToolbars = state.list.map((toolbar) => {
                    toolbar.status = TOOLBAR_STATUS.DEACTIVATE;
                    return toolbar;
                });
                return {
                    ...state,
                    list: newListToolbars,
                };
            }
            default:
                return state;
        }
    },
    fonts: (state = defaultFont, action) => {
        switch (action.type) {
            case ADD_FONT().type: {
                const font = action.payload;
                return {
                    fontName: [...state.fontName, font.name],
                    fontFile: { ...state.fontFile, [font.name]: font.file },
                };
            }
            default:
                return state;
        }
    },
    allPageAttachments: (state = defaultState, action) => {
        switch (action.type) {
            case CREATE_ATTACHMENT().type: {
                const { newAttachment } = action.payload;
                return {
                    ...state,
                    data: [...state.data, newAttachment],
                };
            }

            case UPDATE_ATTACHMENT().type: {
                const { attachmentId, attachment } = action.payload;
                const newAllAttachments = state.data.map((attach) =>
                    attach.id !== attachmentId ? attach : attachment,
                );
                return {
                    ...state,
                    data: newAllAttachments,
                };
            }
            case SELECT_ATTACHMENT_BY_ID().type: {
                const { attachmentId } = action.payload;
                const newAllAttachments = state.data.map((attach) => {
                    if (attach.id === attachmentId) {
                        attach.status = ATTACHMENT_STATUS.ACTIVATE;
                    }
                    return attach;
                });
                return {
                    ...state,
                    data: newAllAttachments,
                };
            }
            case DESELECT_ATTACHMENT_BY_ID().type: {
                const { attachmentId } = action.payload;
                const newAllAttachments = state.data.map((attach) => {
                    if (attach.id === attachmentId) {
                        attach.status = ATTACHMENT_STATUS.DEACTIVATE;
                    }
                    return attach;
                });
                return {
                    ...state,
                    data: newAllAttachments,
                };
            }
            case REMOVE_ATTACHMENT().type: {
                const { attachmentId } = action.payload;
                const newAllAttachments = state.data.map((attach) => {
                    if (attach.id === attachmentId) {
                        attach.status = ATTACHMENT_STATUS.DELETED;
                    }
                    return attach;
                });
                return {
                    ...state,
                    data: newAllAttachments,
                };
            }
            case RESET_SELECT_ATTACHMENTS().type: {
                const newAllAttachments = state.data.map((attach) => {
                    if (attach.status !== ATTACHMENT_STATUS.DELETED) {
                        attach.status = ATTACHMENT_STATUS.DEACTIVATE;
                    }
                    return attach;
                });
                return {
                    ...state,
                    data: newAllAttachments,
                };
            }

            case RESET_PAGE_ATTACHMENTS_STATE().type: {
                return { ...defaultState };
            }

            case ACTIVATE_TOOLBAR().type: {
                const { type, value, group } = action.payload;
                const newAllAttachments = state.data.map((attach) => {
                    if (attach.status === ATTACHMENT_STATUS.ACTIVATE) {
                        // Thêm mới nếu chưa có, cập nhật nếu đã tồn tại
                        const findOption = attach.options.find(
                            (option) => option.type === type || option?.group?.name === group?.name,
                        );
                        if (isEmptyValue(findOption)) {
                            attach.options = [...attach.options, { type, value, group }];
                            return attach;
                        }
                        attach.options = attach.options.map((option) => {
                            if (option.type === type || option?.group?.name === group?.name) {
                                option.value = value;
                                option.type = type;
                            }
                            return option;
                        });
                        return attach;
                    }
                    return attach;
                });
                return {
                    ...state,
                    data: newAllAttachments,
                };
            }

            case DEACTIVATE_TOOLBAR().type: {
                const { type } = action.payload;
                const newAllAttachments = state.data.map((attach) => {
                    if (attach.status === ATTACHMENT_STATUS.ACTIVATE) {
                        attach.options = attach.options.filter((option) => option.type !== type);
                    }
                    return attach;
                });
                return {
                    ...state,
                    data: newAllAttachments,
                };
            }

            default:
                return state;
        }
    },
});
