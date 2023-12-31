import React from 'react';
import classNames from 'classnames/bind';
import styles from './SelectWithSearch.module.sass';
import { useState } from 'react';
import dropdownIcon from '~/assets/images/pdf/dropdown.svg';
import { useRef } from 'react';
import useClickOutsideComponent from '~/hooks/useClickOutSide';
import { isEmptyValue, isExist } from '~/helpers/check';
import { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useUploader } from '~/hooks/useUploader';
import { useDispatch, useSelector } from 'react-redux';
import { UploadTypes } from '~/app-configs';
import { ADD_FONT } from '../../redux/action';
import { Button, Divider } from 'antd';
let cx = classNames.bind(styles);

function SelectWithSearch({ onSelect = () => {} }) {
    const listFont = useSelector((state) => state.feature.fonts.fontName);
    const dispatch = useDispatch();

    const [confirmedValue, setConfirmedValue] = useState('');
    const [searchParams, setSearchParams] = useState(listFont[0]);
    const [matchValue, setMatchValue] = useState('');
    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const inputWrapperRef = useRef(null);
    const inputRef = useRef(null);

    function onChangeValue(e) {
        setSearchParams(e.target.value);
    }

    function onSelectFontSize(font) {
        setSearchParams(font);
        setConfirmedValue(font);
        setIsShowDropdown(false);
    }

    function onKeyDown(event) {
        if (event.code === 'Enter' && isExist(matchValue)) {
            setSearchParams(matchValue);
            setIsShowDropdown(false);
            setConfirmedValue(matchValue);
            inputRef.current.blur();
        }
    }

    useClickOutsideComponent(inputWrapperRef, () => {
        setIsShowDropdown(false);
    });
    useEffect(() => {
        if (confirmedValue) {
            onSelect(confirmedValue);
        }
    }, [confirmedValue]);

    useEffect(() => {
        if (isExist(searchParams)) {
            const searchedFont = listFont.find((font) => font.toLowerCase().includes(searchParams.toLowerCase()));
            setMatchValue(searchedFont);
        }
    }, [searchParams]);

    const {
        inputRef: fontInput,
        handleClick: handleFontClick,
        onClick: onClickFont,
        upload: uploadFont,
    } = useUploader({
        type: UploadTypes.FONT,
        handleResult: initializeFont,
    });

    function initializeFont(fontDetails) {
        dispatch(ADD_FONT(fontDetails));
    }

    const hiddenFontInputs = (
        <input
            data-testid="font-input"
            ref={fontInput}
            type="file"
            name="font"
            id="font"
            accept=".ttf"
            onChange={uploadFont}
            onClick={onClickFont}
            style={{ display: 'none' }}
        />
    );

    return (
        <span className={cx('input')} ref={inputWrapperRef}>
            {hiddenFontInputs}
            <input
                type="text"
                value={searchParams}
                onChange={onChangeValue}
                placeholder="Chọn font chữ"
                onFocus={() => setIsShowDropdown(true)}
                onKeyDown={onKeyDown}
                ref={inputRef}
                style={{
                    paddingLeft: '5px',
                    height: '35px',
                    marginRight: '10px',
                }}
            ></input>
            <img
                src={dropdownIcon}
                className={cx('dropdown-icon')}
                style={{
                    width: '14px',
                }}
                onClick={() => (isShowDropdown ? setIsShowDropdown(false) : setIsShowDropdown(true))}
            ></img>
            {isShowDropdown && isExist(listFont) && (
                <ul className={cx('dropdown-list')}>
                    {listFont.map((select) => {
                        return (
                            <li
                                key={select}
                                className={cx('dropdown-item', matchValue === select ? 'active' : '')}
                                onClick={() => onSelectFontSize(select)}
                            >
                                {select}
                            </li>
                        );
                    })}
                    <Divider
                        style={{
                            margin: '8px 0 0 0',
                        }}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={handleFontClick} style={{ width: '100%' }}>
                        Thêm font
                    </Button>
                </ul>
            )}
        </span>
    );
}

export default SelectWithSearch;
