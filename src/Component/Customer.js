import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../CSS/EditableTable.css'
import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {listCustomer} from "../DefaultValue/DefaultValue";
import ModalCustomer from "./ModalCustomer";


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
                            onClick={() => handleDeleteCustomer(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const [dataCustomer, setDataCustomer] = useState([]);
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
            const response = await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/customer.json');
            console.log(response)
            const responseData = await response.json();

            const loadCustomer = [];

            for (const key in responseData) {
                loadCustomer.push({
                    key: responseData[key].key,
                    name: responseData[key].name,
                    age: responseData[key].age,
                    address: responseData[key].address
                })
            }
            setDataCustomer(loadCustomer);
        }
        fetchCustomer();
    }, [])

    async function addCustomer(record) {
        try {
            await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/customer.json', {
                method: 'POST',
                body: JSON.stringify({
                    address: record['address'],
                    age: record['age'],
                    key: record['key'],
                    name: record['name']
                }),
                headers: {
                    'Content-Type:': 'application/json'
                }
            });
        } catch (e) {
            console.log(e)
        }
    }

    const onSaveData = async (record) => {
        await addCustomer(record);
        setModel({...model, visible: false})
    }

    const onUpdateData = (record) => {
        const index = dataCustomer.findIndex(data => data.key === record.key);
        const newData = [...dataCustomer];
        newData[index] = record;
        setDataCustomer(newData);
        setModel({...model, visible: false})
    }

    const handleDeleteCustomer = (record) => {
        const newCustomersList = dataCustomer.filter((customer) => {
            return customer.key !== record.key;
        });
        setDataCustomer(newCustomersList);
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
                       onSaveData={onSaveData} onUpdateData={onUpdateData}
        />
        <Table dataSource={dataCustomer}
               columns={columns}/>
    </>);
};

export default Customer;