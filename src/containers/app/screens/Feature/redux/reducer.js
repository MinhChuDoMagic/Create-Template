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
import { REQUEST_STATE } from '~/app-configs';
import { isEmptyValue, isExist } from '~/helpers/check';
// import { ATTACHMENT_STATUS } from '~/hooks/useAttachments';
import { TOOLBAR_STATUS } from '~/hooks/useToolbar';

const defaultState = {
    state: null,
    data: null,
};

const defaultFont = ['Aria', 'Roboto', 'Times New Roman'];

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
                return [...state, font];
            }
            default:
                return state;
        }
    },
});
