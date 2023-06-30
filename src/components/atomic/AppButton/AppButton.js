import React, { useEffect, useState } from 'react';
import FourdotLight from '../FourdotLight/FourdotLight';
import FourdotDark from '../FourdotDark/FourdotDark';
import classNames from 'classnames/bind';
import styles from './AppButton.module.sass';

let cx = classNames.bind(styles);

export const BUTTON_COLOR = {
    PRIMARY: 'PRIMARY',
    WHITE: 'WHITE',
    ORANGE: 'ORANGE',
    BLUE: 'BLUE',
};

export const LOADING_STYLES = {
    WHITE: 'WHITE',
    BLACK: 'BLACK',
};

function AppButton({
    children,
    buttonStyle = BUTTON_COLOR.PRIMARY,
    loading = false,
    disabled = false,
    loadingIcon = <FourdotLight />,
    ...rest
}) {
    function getClassNameFromProps() {
        switch (buttonStyle) {
            case BUTTON_COLOR.PRIMARY: {
                return {
                    loadingStyles: LOADING_STYLES.WHITE,
                };
            }
            case BUTTON_COLOR.WHITE: {
                return {
                    classNames: 'app-button-white',
                    loadingStyles: LOADING_STYLES.BLACK,
                };
            }
            case BUTTON_COLOR.ORANGE: {
                return {
                    classNames: 'app-button-orange',
                    loadingStyles: LOADING_STYLES.WHITE,
                };
            }
            case BUTTON_COLOR.BLUE: {
                return {
                    classNames: 'app-button-blue',
                    loadingStyles: LOADING_STYLES.WHITE,
                };
            }
            default:
                return {
                    loadingStyles: LOADING_STYLES.WHITE,
                };
        }
    }

    function getLoadingStyles() {
        switch (getClassNameFromProps().loadingStyles) {
            case LOADING_STYLES.BLACK:
                return <FourdotDark />;
            case LOADING_STYLES.WHITE:
                return <FourdotLight />;
            default:
                return <FourdotLight />;
        }
    }

    return (
        <button
            disabled={disabled}
            className={cx('app-button', 'flex-center', loading ? '' : getClassNameFromProps().classNames)}
            {...rest}
        >
            {loading ? getLoadingStyles() : children}
        </button>
    );
}

export default AppButton;
