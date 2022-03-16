import React from 'react';
import {Menu} from "antd";
import {FormatPainterOutlined, ShoppingCartOutlined, UsergroupDeleteOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import Sider from "antd/es/layout/Sider";

const SiderWebsite = () => {
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
            >
                <Menu.Item key="1" icon={<UsergroupDeleteOutlined/>}>
                    <Link to='/customer'>Customer</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ShoppingCartOutlined/>}>
                    <Link to='/order'>Order</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FormatPainterOutlined/>}>
                    <Link to='/product'>Product</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};
export default SiderWebsite;