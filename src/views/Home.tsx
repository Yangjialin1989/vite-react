import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import {Outlet,useNavigate} from "react-router-dom";


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', 'page1', <PieChartOutlined />),
    getItem('Option 2', 'page2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigateTo = useNavigate()

    //函数
    const menuClick = (e:{key:string})=>{
        navigateTo(e.key)
        //点击跳转到对应的路由,通过key 指定路由的path路径，编程式导航跳转，利用一个hook
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 左边侧边栏*/}
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={menuClick}/>
            </Sider>
            {/* 右边内容*/}
            <Layout className="site-layout">
                {/* 右边头部*/}
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <Breadcrumb style={{ margin: '16px 16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                {/* 右边内容*/}
                <Content style={{ margin: '16px 16px 0' }} className="site-layout-background">
                    {/* outlet 窗口 ,展示对应的组件*/}
                    <Outlet />
                </Content>
                {/* 右边底部*/}
                <Footer style={{ textAlign: 'center',padding:0,lineHeight:'48px'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default View;