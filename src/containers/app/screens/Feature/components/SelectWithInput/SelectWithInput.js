import React from 'react';
import classNames from 'classnames/bind';
import styles from './SelectWithInput.module.sass';
import { useState } from 'react';
import dropdownIcon from '~/assets/images/pdf/dropdown.svg';
import { useRef } from 'react';
import useClickOutsideComponent from '~/hooks/useClickOutSide';
import { isEmptyValue, isExist } from '~/helpers/check';
import { useEffect } from 'react';
let cx = classNames.bind(styles);

function SelectWithInput({ listSelect = [], defaultValue = 14, onSelect = () => {} }) {
    const [value, setValue] = useState(defaultValue);
    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const inputWrapperRef = useRef(null);
    const inputRef = useRef(null);

    function onChangeValue(e) {
        var reg = /^\d+$/;
        if (reg.test(e.target.value) || isEmptyValue(e.target.value)) {
            setValue(e.target.value);
        }
    }

    function onSelectFontSize(fontSize) {
        setValue(fontSize);
        setIsShowDropdown(false);
    }

    function onKeyDown(event) {
        if (event.code === 'Enter') {
            setIsShowDropdown(false);
            inputRef.current.blur();
        }
    }

    useClickOutsideComponent(inputWrapperRef, () => {
        setIsShowDropdown(false);
    });
    useEffect(() => {
        onSelect(value);
    }, [value]);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <span className={cx('input')} ref={inputWrapperRef}>
            <input
                type="text"
                value={value}
                onChange={onChangeValue}
                placeholder="Chọn kích cỡ"
                onFocus={() => setIsShowDropdown(true)}
                onKeyDown={onKeyDown}
                ref={inputRef}
                style={{
                    paddingLeft: '5px',
                    width: '55px',
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
            {isShowDropdown && isExist(listSelect) && (
                <ul className={cx('dropdown-list')}>
                    {listSelect.map((select) => {
                        return (
                            <li
                                key={select}
                                className={cx('dropdown-item', value == select ? 'active' : '')}
                                onClick={() => onSelectFontSize(select)}
                            >
                                {select}
                            </li>
                        );
                    })}
                </ul>
            )}
        </span>
    );
}

export default SelectWithInput;
