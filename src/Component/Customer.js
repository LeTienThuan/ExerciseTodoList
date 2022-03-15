import { Layout, Menu, Breadcrumb } from 'antd';
import { UsergroupDeleteOutlined, ShoppingCartOutlined, FormatPainterOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import 'antd/dist/antd.css'
import {Link} from "react-router-dom";

const { Header, Content, Sider } = Layout;

const Customer = (props) =>{
    return(
        <Layout>
            <Header className="header" style={{backgroundColor:"orange", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Title  level={2}>Shopping Management</Title>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1" icon={<UsergroupDeleteOutlined />}>
                            <Link to='/customer'>Customer</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>Order</Menu.Item>
                        <Menu.Item key="3" icon={<FormatPainterOutlined />}>Product</Menu.Item>

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default Customer