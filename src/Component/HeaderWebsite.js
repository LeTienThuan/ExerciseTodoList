import React from 'react';
import {Header} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import 'antd/dist/antd.css';
import '../CSS/HeaderWebsite.css';

const HeaderWebsite = () => {
    return (
        <Header className="header">
            <Title level={3}>Shopping Management</Title>
        </Header>
    );
};

export default HeaderWebsite;