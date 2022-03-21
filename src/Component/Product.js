import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import ModalProduct from "./ModalProduct";
import {addProduct, deleteProduct, editProduct} from "../API/requestProduct";

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
                            onClick={() => handleDeleteData(record['key'])}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const [dataProduct, setDataProduct] = useState([]);
    const [statusData, setStatusData] = useState(Math.random());
    const [model, setModel] = useState({
        visible: false,
        product: {},
        inform: '',
        title: '',
        onCancel: () => {
            setModel({...model, visible: false});
        },
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/products.json');
            const responseData = await response.json();

            const loadedProducts = [];

            for (const key in responseData) {
                loadedProducts.push({
                    key: key,
                    name: responseData[key].name,
                    trademark: responseData[key].trademark,
                    expiredDate: responseData[key].expiredDate,
                    price: responseData[key].price
                })
            }
            setDataProduct(loadedProducts);
        }
        fetchProduct();
    }, [statusData])

    const handleSaveData = async (record) => {
        await addProduct(record);
        setStatusData(Math.random())
        setModel({...model, visible: false})
    }

    const handleUpdateData = async (record) => {
        const {key, ...newRecord} = record;
        await editProduct(key, newRecord);
        setStatusData(Math.random());
        setModel({...model, visible: false});
    }
    const handleDeleteData = async (key) => {
        await deleteProduct(key)
        setStatusData(Math.random())
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