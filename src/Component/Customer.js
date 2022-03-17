import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../CSS/EditableTable.css'
import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {listCustomer} from "../DefaultValue/DefaultValue";
import ModalCustomer from "./ModalCustomer";

let customerKey = 4;

const Customer = () =>{
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
                    <Button type='primary'
                            icon={<EditOutlined/>}
                            onClick={() => setModel({visible: true, customer: record})}
                    >
                        Edit
                    </Button>
                    <Button type='primary'
                            danger={true}
                            icon={<DeleteOutlined />}
                            onClick={() =>handleDeleteCustomer(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const [dataCustomer, setDataCustomer] = useState(listCustomer);
    const [model, setModel] = useState({
        visible: false,
        customer: {},

    });

    const handleAddCustomer = (newCustomer) =>{
        setDataCustomer([...dataCustomer, {key: customerKey, ...newCustomer}])
        customerKey++;
    }
    const handleEditCustomer = (newRecord) =>{
        const newData = dataCustomer.map(data =>{
          return  data.key === newRecord.key ?  {...data, ...newRecord} : data;
        })
        setDataCustomer(newData);
    }
    const handleDeleteCustomer = (record) =>{
        const newCustomersList = dataCustomer.filter((customer) =>{
            return customer.key !== record.key;
        });
        setDataCustomer(newCustomersList);
    }
    return  <>
                <Button type="primary" style={{marginBottom: '20px'}} onClick={() => setModel({visible: true})}>Add New Customer</Button>
                <ModalCustomer model={model}

                />
                <Table dataSource={dataCustomer}
                       columns={columns} />
            </>;
};

export default Customer;