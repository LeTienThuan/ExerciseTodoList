import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {listProduct} from "../DefaultValue/DefaultValue";
import ModalProduct from "./ModalProduct";

const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

const Product = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trademark',
            dataIndex: 'trademark',
            key: 'trademark',
        },
        {
            title: 'Expired Date',
            dataIndex: 'expiredDate',
            key: 'expiredDate'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => {
                return formatter.format(price);
            }
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
                                product: record,
                                inform: 'Edit Successfully',
                                title: 'Edit Customer'
                            })}
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

    const [dataProduct, setDataProduct] = useState(listProduct);
    const [model, setModel] = useState({
        visible: false,
        product: {},
        inform: '',
        title: '',
        onCancel: () => {
            setModel({...model, visible: false});
        },
    });
    console.log(localStorage.getItem('dataProduct'))
    const handleSaveData = (record) => {
        const newData = [...dataProduct];
        newData.push(record);
        setDataProduct(newData);
        setModel({...model, visible: false})
    }

    const handleUpdateData = (record) => {
        const index = dataProduct.findIndex(data => data.key === record.key);
        const newData = [...dataProduct];
        newData[index] = record;
        setDataProduct(newData);
        setModel({...model, visible: false})
    }

    return (<>
        <Button type="primary"
                style={{marginBottom: '20px'}}
                onClick={() => setModel({
                    ...model,
                    visible: true,
                    title: 'Add New Product',
                    inform: 'Add Successfully'
                })}
        >
            Add New Product
        </Button>
        <ModalProduct model={model} onUpdateData={handleUpdateData} onSaveData={handleSaveData}/>
        <Table dataSource={dataProduct} columns={columns}/>
    </>)
}
export default Product