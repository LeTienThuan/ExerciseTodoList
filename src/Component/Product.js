import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React from "react";

const Product = (props) =>{
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title:'Expired Date',
            dataIndex: 'expiredDate',
            key: 'expiredDate'
        },
        {
            title: 'Company',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (

                <Space size="middle">
                    <Button type='primary'
                            icon={<EditOutlined/>}
                    >
                        Edit
                    </Button>
                    <Button type='primary'
                            danger={true}
                            icon={<DeleteOutlined/>}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (<>
                <Button type="primary"
                        style={{marginBottom: '20px'}}>
                    Add New Product
                </Button>
                <Table columns={columns}/>
            </>)
}
export default  Product