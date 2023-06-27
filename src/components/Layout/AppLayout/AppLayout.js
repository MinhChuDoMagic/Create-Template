import { AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Image, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import hustLogo from '~/assets/images/header/hust-logo.jpeg';
import hustLogoNgang from '~/assets/images/header/logo-hust-ngang.jpg';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SIDER_COLLAPSE } from '~/app-configs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppHeader from '~/components/Layout/components/Header';
import './AppLayout.sass';

const { Sider, Content } = Layout;

export function getNavItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const sliderItems = [
    getNavItem('Tài khoản', 'account', <UserOutlined />, [
        getNavItem('Danh sách tài khoản', '/accounts/list'),
        getNavItem('Thêm tài khoản', '/accounts/add'),
    ]),
    getNavItem('Cấu hình chứng chỉ', '/config/select-ceft', <AppstoreOutlined />, null),
    getNavItem('Cấu hình hợp đồng', '/config/blockchain', <SettingOutlined />, null),
];

function AppLayout({ children, match }) {
    return <div>{children}</div>;
}

export default AppLayout;
