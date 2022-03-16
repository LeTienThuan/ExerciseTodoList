import React from 'react';
import {Breadcrumb, Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import '../CSS/ContentWebsite.css'
import {useLocation} from "react-router-dom";

const ContentWebsite = (props) => {
    let location = useLocation().pathname.replace("/","");
    let upperCase = location.charAt(0).toUpperCase();
    let stringWithoutFirstLetter = location.slice(1);
    location = upperCase + stringWithoutFirstLetter;

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{location}</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="site-layout-background">
                {props.children}
            </Content>
        </Layout>
    );
};

export default ContentWebsite;