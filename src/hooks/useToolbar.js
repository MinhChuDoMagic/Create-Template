import { useDispatch, useSelector } from 'react-redux';
import BoldIcon from '~/assets/images/pdf/bold.svg';
import ItalicIcon from '~/assets/images/pdf/italic.svg';
import UnderlinedIcon from '~/assets/images/pdf/underlined.svg';
import JustifyLeftIcon from '~/assets/images/pdf/justify-left.svg';
import JustifyCenterIcon from '~/assets/images/pdf/justify-center.svg';
import JustifyRightIcon from '~/assets/images/pdf/justify-right.svg';
import BoldIconWhite from '~/assets/images/pdf/bold-white.svg';
import ItalicIconWhite from '~/assets/images/pdf/italic-white.svg';
import UnderlinedIconWhite from '~/assets/images/pdf/underlined-white.svg';
import JustifyLeftIconWhite from '~/assets/images/pdf/justify-left-white.svg';
import JustifyCenterIconWhite from '~/assets/images/pdf/justify-center-white.svg';
import JustifyRightIconWhite from '~/assets/images/pdf/justify-right-white.svg';
import {
    DEACTIVATE_TOOLBAR,
    ACTIVATE_TOOLBAR,
    SET_TOOLBARS,
    RESET_ACTIVATE_TOOLBARS,
} from '~/containers/app/screens/Feature/redux/action';
import { isExist } from '~/helpers/check';
import store from '~/redux';
import SelectWithInput from '~/containers/app/screens/Feature/components/SelectWithInput/SelectWithInput';
import SelectWithSearch from '~/containers/app/screens/Feature/components/SelectWithSearch/SelectWithSearch';
import ColorPickerButton from '~/components/colorPicker/ColorPickerButton';

export const TOOLBAR_STATUS = {
    ACTIVATE: 'activate',
    DEACTIVATE: 'deactivate',
    SELECTED: 'selected',
    DISABLED: 'disabled',
};

export const TOOLBAR_TYPES = {
    BOLD: 'bold',
    ITALIC: 'italic',
    UNDERLINE: 'underline',
    FONTSIZE: 'fontsize',
    JUSTIFY_LEFT: 'justifyleft',
    JUSTIFY_CENTER: 'justifycenter',
    JUSTIFY_RIGHT: 'justifyright',
    FONT_FAMILY: 'fontfamily',
    TEXT_COLOR: 'textcolor',
};

export const GROUP_NAMES = {
    BOLD: 'bold',
    ITALIC: 'italic',
    UNDERLINE: 'underline',
    FONTSIZE: 'fontsize',
    JUSTIFY_HORIZONTAL: 'justify_horizontal',
    ALIGN_VERTICAL: 'align_vertical',
    FONT_FAMILY: 'fontfamily',
    TEXT_COLOR: 'textcolor',
};

export const STYLES_DICTIONARY = {
    [TOOLBAR_TYPES.BOLD]: (value = 'bold') => ({
        cssStyle: {
            fontWeight: value,
        },
        optionsStyle: {
            fontWeight: value,
        },
    }),
    [TOOLBAR_TYPES.ITALIC]: (value = 'italic') => ({
        cssStyle: {
            fontStyle: value,
        },
        optionsStyle: {
            fontStyle: value,
        },
    }),
    [TOOLBAR_TYPES.UNDERLINE]: (value = 'underline') => ({
        cssStyle: {
            textDecoration: value,
        },
        optionsStyle: {
            textDecoration: value,
        },
    }),
    [TOOLBAR_TYPES.FONTSIZE]: (value = 14) => ({
        cssStyle: {
            fontSize: Number(value),
            lineHeight: `${value}px`,
        },
        optionsStyle: {
            fontSize: Number(value),
            lineHeight: `${value}px`,
        },
    }),
    [TOOLBAR_TYPES.JUSTIFY_LEFT]: (value = 'left') => ({
        cssStyle: {
            justifyContent: value,
        },
        optionsStyle: {
            justifyContent: value,
        },
    }),
    [TOOLBAR_TYPES.JUSTIFY_CENTER]: (value = 'center') => ({
        cssStyle: {
            justifyContent: value,
        },
        optionsStyle: {
            justifyContent: value,
        },
    }),
    [TOOLBAR_TYPES.JUSTIFY_LEFT]: (value = 'left') => ({
        cssStyle: {
            justifyContent: value,
        },
        optionsStyle: {
            justifyContent: value,
        },
    }),
    [TOOLBAR_TYPES.JUSTIFY_RIGHT]: (value = 'right') => ({
        cssStyle: {
            justifyContent: value,
        },
        optionsStyle: {
            justifyContent: value,
        },
    }),
    [TOOLBAR_TYPES.FONT_FAMILY]: (value = 'aria') => ({
        cssStyle: {
            fontFamily: value,
        },
        optionsStyle: {
            fontFamily: value,
        },
    }),
};

const Bold = {
    component: function (toolbar, listToolbars) {
        function getStyle() {
            switch (toolbar?.status) {
                case TOOLBAR_STATUS.ACTIVATE:
                    return { backgroundColor: '#1B709B' };
                default:
                    return {};
            }
        }
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px',
                    height: '35px',
                    border: '1px solid #333',
                    marginRight: '8px',
                    ...getStyle(),
                }}
                onClick={() => toolbar.onClick(toolbar, listToolbars)}
            >
                <img
                    style={{
                        width: '14px',
                        cursor: 'pointer',
                    }}
                    src={toolbar?.status === TOOLBAR_STATUS.ACTIVATE ? BoldIconWhite : BoldIcon}
                ></img>
            </div>
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.BOLD,
    },
    onClick: function (toolbar, listToolbars) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        if (toolbar?.status === TOOLBAR_STATUS.ACTIVATE) {
            store.dispatch(DEACTIVATE_TOOLBAR({ type: this.type }));
            return;
        }
        store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: 'bold', group: this.group }));
    },
    status: TOOLBAR_STATUS.DEACTIVATE,
    type: TOOLBAR_TYPES.BOLD,
};

export const Italic = {
    component: function (toolbar, listToolbars) {
        function getStyle() {
            switch (toolbar?.status) {
                case TOOLBAR_STATUS.ACTIVATE:
                    return { backgroundColor: '#1B709B' };
                default:
                    return {};
            }
        }
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px',
                    height: '35px',
                    border: '1px solid #333',
                    marginRight: '8px',
                    ...getStyle(),
                }}
                onClick={() => toolbar.onClick(toolbar, listToolbars)}
            >
                <img
                    style={{
                        width: '14px',
                        cursor: 'pointer',
                    }}
                    src={toolbar?.status === TOOLBAR_STATUS.ACTIVATE ? ItalicIconWhite : ItalicIcon}
                ></img>
            </div>
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.ITALIC,
    },
    onClick: function (toolbar, listToolbars) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        if (toolbar?.status === TOOLBAR_STATUS.ACTIVATE) {
            store.dispatch(DEACTIVATE_TOOLBAR({ type: this.type }));
            return;
        }
        store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: 'italic', group: this.group }));
    },
    status: TOOLBAR_STATUS.DEACTIVATE,
    type: TOOLBAR_TYPES.ITALIC,
};

export const Underline = {
    component: function (toolbar, listToolbars) {
        function getStyle() {
            switch (toolbar?.status) {
                case TOOLBAR_STATUS.ACTIVATE:
                    return { backgroundColor: '#1B709B' };
                default:
                    return {};
            }
        }
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px',
                    height: '35px',
                    border: '1px solid #333',
                    marginRight: '8px',
                    ...getStyle(),
                }}
                onClick={() => toolbar.onClick(toolbar, listToolbars)}
            >
                <img
                    style={{
                        width: '14px',
                        cursor: 'pointer',
                    }}
                    src={toolbar?.status === TOOLBAR_STATUS.ACTIVATE ? UnderlinedIconWhite : UnderlinedIcon}
                ></img>
            </div>
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.UNDERLINE,
    },
    onClick: function (toolbar, listToolbars) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        if (toolbar?.status === TOOLBAR_STATUS.ACTIVATE) {
            store.dispatch(DEACTIVATE_TOOLBAR({ type: this.type }));
            return;
        }
        store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: 'underline', group: this.group }));
    },
    status: TOOLBAR_STATUS.DEACTIVATE,
    type: TOOLBAR_TYPES.UNDERLINE,
};

export const FontSize = {
    component: function (toolbar, listToolbars, selectedAttachment) {
        const fontValue = (selectedAttachment?.options ?? []).find((option) => option.type === this.type);
        return (
            <SelectWithInput
                listSelect={[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]}
                onSelect={(value) => {
                    toolbar.onClick(toolbar, listToolbars, value);
                }}
                defaultValue={fontValue?.value ?? 14}
            />
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.FONTSIZE,
    },
    onClick: function (toolbar, listToolbars, value) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        if (isExist(value)) {
            store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: value, group: this.group }));
        }
    },
    status: TOOLBAR_STATUS.DEACTIVATE,
    type: TOOLBAR_TYPES.FONTSIZE,
};

export const JustifyLeft = {
    component: function (toolbar, listToolbars) {
        function getStyle() {
            switch (toolbar?.status) {
                case TOOLBAR_STATUS.ACTIVATE:
                    return { backgroundColor: '#1B709B' };
                default:
                    return {};
            }
        }
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px',
                    height: '35px',
                    border: '1px solid #333',
                    marginRight: '8px',
                    ...getStyle(),
                }}
                onClick={() => toolbar.onClick(toolbar, listToolbars)}
            >
                <img
                    style={{
                        width: '14px',
                        cursor: 'pointer',
                    }}
                    src={toolbar?.status === TOOLBAR_STATUS.ACTIVATE ? JustifyLeftIconWhite : JustifyLeftIcon}
                ></img>
            </div>
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.JUSTIFY_HORIZONTAL,
    },
    onClick: function (toolbar, listToolbars) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: 'left', group: this.group }));
    },
    status: TOOLBAR_STATUS.DEACTIVATE,
    type: TOOLBAR_TYPES.JUSTIFY_LEFT,
};

export const JustifyCenter = {
    component: function (toolbar, listToolbars) {
        function getStyle() {
            switch (toolbar?.status) {
                case TOOLBAR_STATUS.ACTIVATE:
                    return { backgroundColor: '#1B709B' };
                default:
                    return {};
            }
        }
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px',
                    height: '35px',
                    border: '1px solid #333',
                    marginRight: '8px',
                    ...getStyle(),
                }}
                onClick={() => toolbar.onClick(toolbar, listToolbars)}
            >
                <img
                    style={{
                        width: '14px',
                        cursor: 'pointer',
                    }}
                    src={toolbar?.status === TOOLBAR_STATUS.ACTIVATE ? JustifyCenterIconWhite : JustifyCenterIcon}
                ></img>
            </div>
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.JUSTIFY_HORIZONTAL,
    },
    onClick: function (toolbar, listToolbars) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: 'center', group: this.group }));
    },
    status: TOOLBAR_STATUS.ACTIVATE,
    type: TOOLBAR_TYPES.JUSTIFY_CENTER,
};

export const JustifyRight = {
    component: function (toolbar, listToolbars) {
        function getStyle() {
            switch (toolbar?.status) {
                case TOOLBAR_STATUS.ACTIVATE:
                    return { backgroundColor: '#1B709B' };
                default:
                    return {};
            }
        }
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px',
                    height: '35px',
                    border: '1px solid #333',
                    marginRight: '8px',
                    ...getStyle(),
                }}
                onClick={() => toolbar.onClick(toolbar, listToolbars)}
            >
                <img
                    style={{
                        width: '14px',
                        cursor: 'pointer',
                    }}
                    src={toolbar?.status === TOOLBAR_STATUS.ACTIVATE ? JustifyRightIconWhite : JustifyRightIcon}
                ></img>
            </div>
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.JUSTIFY_HORIZONTAL,
    },
    onClick: function (toolbar, listToolbars) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: 'right', group: this.group }));
    },
    status: TOOLBAR_STATUS.DEACTIVATE,
    type: TOOLBAR_TYPES.JUSTIFY_RIGHT,
};

export const TextColor = {
    component: function (toolbar, listToolbars) {
        return (
            <ColorPickerButton
                onSelect={(value) => {
                    toolbar.onClick(toolbar, listToolbars, value);
                }}
            />
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.TEXT_COLOR,
    },
    onClick: function (toolbar, listToolbars, value) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        if (isExist(value)) {
            store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: value, group: this.group }));
        }
    },
    status: TOOLBAR_STATUS.DEACTIVATE,
    type: TOOLBAR_TYPES.TEXT_COLOR,
};

export const FontFamily = {
    component: function (toolbar, listToolbars, selectedAttachment) {
        return (
            <SelectWithSearch
                onSelect={(value) => {
                    toolbar.onClick(toolbar, listToolbars, value);
                }}
            />
        );
    },
    group: {
        isOnlySelectOne: true,
        name: GROUP_NAMES.FONT_FAMILY,
    },
    onClick: function (toolbar, listToolbars, value) {
        if (toolbar?.status === TOOLBAR_STATUS.DISABLED) {
            return;
        }
        if (isExist(value)) {
            store.dispatch(ACTIVATE_TOOLBAR({ type: this.type, value: value, group: this.group }));
        }
    },
    status: TOOLBAR_STATUS.DEACTIVATE,
    type: TOOLBAR_TYPES.FONT_FAMILY,
};

export const useToolbars = () => {
    const dispatch = useDispatch();
    const toolbars = useSelector((state) => state.feature.toolbars);

    const listToolbars = [
        Bold,
        Italic,
        Underline,
        FontSize,
        FontFamily,
        TextColor,
        JustifyLeft,
        JustifyCenter,
        JustifyRight,
    ];

    const initializeToolbars = () => {
        dispatch(SET_TOOLBARS({ listToolbars: listToolbars }));
        dispatch(ACTIVATE_TOOLBAR({ type: TOOLBAR_TYPES.FONTSIZE, value: 14 }));
    };

    const resetActivateToolbars = () => dispatch(RESET_ACTIVATE_TOOLBARS());

    return {
        listToolbars: toolbars.list ?? [],
        selectedToolbars: toolbars.selectedToolbars ?? [],
        initializeToolbars,
        resetActivateToolbars,
    };
};
