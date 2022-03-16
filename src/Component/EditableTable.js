import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../CSS/EditableTable.css'
import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, UserAddOutlined} from "@ant-design/icons";
import {listCustomer} from "../DefaultValue/DefaultValue";


const EditableTable = () =>{
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary' icon={<EditOutlined/>}>Edit</Button>
                    <Button type='primary'
                            danger={true}
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteCustomer}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const [dataCustomer, setDataCustomer] = useState(listCustomer);

    const handleAddCustomer = () =>{
        setDataCustomer([...dataCustomer,     {
            key: Math.random().toFixed(3),
            name: '',
            age: 0,
            address: '',
        }])
    }
    const handleDeleteCustomer = (key) =>{
        const newCustomersList = dataCustomer.filter((customer) =>{
            return customer.key !== key;
        });
        setDataCustomer(newCustomersList);
    }
    return  <>
                <Button type="primary"
                        icon={<UserAddOutlined />}
                        style={{marginBottom: 20}}
                        onClick={handleAddCustomer}>Add Customer</Button>
                <Table dataSource={dataCustomer}
                       columns={columns} />
            </>;
};

export default EditableTable;