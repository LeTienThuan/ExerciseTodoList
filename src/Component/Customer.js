import React, {createContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../CSS/EditableTable.css'
import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ModalCustomer from "./ModalCustomer";
import {addCustomer, deleteCustomer, editCustomer} from "../API/requestCustomer";

const Customer = () => {
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
                            onClick={() => setModel({
                                ...model,
                                visible: true,
                                customer: record,
                                inform: 'Edit Successfully',
                                title: 'Edit Customer'
                            })}
                    >
                        Edit
                    </Button>
                    <Button type='primary'
                            danger={true}
                            icon={<DeleteOutlined/>}
                            onClick={() => handleDeleteCustomer(record['key'])}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const [dataCustomer, setDataCustomer] = useState([]);
    const [statusData, setStatusData] = useState(Math.random());
    const [model, setModel] = useState({
        visible: false,
        customer: {},
        inform: '',
        title: '',
        onCancel: () => {
            setModel({...model, visible: false});
        },
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            const response = await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/customers.json');
            const responseData = await response.json();

            const loadedCustomer = [];

            for (const key in responseData) {
                loadedCustomer.push({
                    key: key,
                    name: responseData[key].name,
                    age: responseData[key].age,
                    address: responseData[key].address
                })
            }
            setDataCustomer(loadedCustomer);
        }
        fetchCustomer();
    }, [statusData])

    const handleSaveData = async (record) => {
        await addCustomer(record);
        setStatusData(Math.random());
        setModel({...model, visible: false})
    }

    const handleUpdateData = async (record) => {
        const{ key, ...newRecord } = record;
        await editCustomer(key, newRecord)
        setStatusData(Math.random());
    }

    const handleDeleteCustomer = async (key) => {
        await deleteCustomer(key);
        setStatusData(Math.random());
    }

    return (<>
                <Button type="primary"
                        style={{marginBottom: '20px'}}
                        onClick={() => setModel({
                            ...model,
                            visible: true,
                            title: 'Add New Customer',
                            inform: 'Add Successfully',
                        })}
                >
                    Add New Customer
                </Button>
                <ModalCustomer model={model}
                               onSaveData={handleSaveData} onUpdateData={handleUpdateData}
                />
                <Table dataSource={dataCustomer}
                       columns={columns}/>
            </>);
};

export default Customer;



