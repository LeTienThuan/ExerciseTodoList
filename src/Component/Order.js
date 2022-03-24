import {Button, message, Space, Table} from "antd";
import ModalAddOrder from "./ModalAddOrder";
import {getCustomers} from "../API/requestCustomer";
import React, {useEffect, useState} from "react";
import {getProducts} from "../API/requestProduct";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {formatter} from "./Product";
import {addOrder, deleteOrder, editOrder, getOrders} from "../API/requestOrder";
import ModalEditOrder from "./ModalEditOrder";

const Order = () => {
    const columns = [
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => {
                if (record.isChanged) {
                    return (<>
                        <Button shape="circle" onClick={() => increaseQuantity(record)}>+</Button>
                        &nbsp;{quantity}&nbsp;
                        <Button shape="circle" onClick={() => decreaseQuantity(record)}>-</Button>
                    </>)
                } else {
                    return <>{quantity}</>
                }
            }
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
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: total => {
                return formatter.format(total);
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type='primary'
                            icon={<EditOutlined/>}
                            onClick={() => setModel({...model, visible: true, record, title: 'Edit Order'})}
                    >
                        Edit
                    </Button>
                    <Button type='primary'
                            danger={true}
                            icon={<DeleteOutlined/>}
                            onClick={() => handleRemoveOrder(record['key'])}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    const [data, setData] = useState({
        customers: [],
        products: []
    })
    const [model, setModel] = useState({
        visible: false,
        record: {},
        inform: '',
        title: '',
        onCancel: () => {
            setModel({...model, visible: false});
        },
    });
    const [listOrder, setListOrder] = useState([]);

    useEffect(() => {

        getCustomers().then(customers => {
            setData(prevState => {
                return {...prevState, customers}
            })
        })
        getProducts().then(products => {
            setData(prevState => {
                return {...prevState, products}
            })
        })
        getOrders().then(orders => setListOrder(orders))
    }, []);
    const getInforProduct = (key) => {
        return data.products.filter(product => product.key === key)[0]
    }
    const getOrder = (record) => {
        const newData = [];
        const {customer, products} = record;
        for (let i = 0; i < products.length; i++) {
            const product = getInforProduct(products[i]);
            const {name, price, key} = product;
            newData.push({customer, product: name, price, quantity: 1, total: price, key, isChanged: true})
        }
        setListOrder([...listOrder, ...newData]);
    }
    const increaseQuantity = (record) => {
        let {quantity, total, price} = record;
        quantity++;
        total = price * quantity;
        const newRecord = {...record, quantity, total, price}
        const newListOrder = listOrder.map(order => {
            if (order.key === newRecord.key) {
                order['quantity'] = newRecord['quantity'];
                order['total'] = newRecord['total'];
            }
            return order;
        })
        setListOrder(newListOrder)
    }
    const decreaseQuantity = (record) => {
        let {quantity, total, price} = record;
        quantity > 1 ? quantity-- : quantity = 1;
        total = price * quantity;
        const newRecord = {...record, quantity, total, price}
        const newListOrder = listOrder.map(order => {
            if (order.key === newRecord.key) {
                order['quantity'] = newRecord['quantity'];
                order['total'] = newRecord['total'];
            }
            return order;
        })
        setListOrder(newListOrder)
    }
    const handleSaveOrder = async () => {
        for (let order of listOrder) {
            if (order.isChanged) {
                order.isChanged = false;
                await addOrder(order);
            }
        }
        message.success('Add Successfully')
        setListOrder(prevState => [...prevState])
    }
    const handleEditOrder = async (record) => {
        const {key} = record;
        await editOrder(key, record);
        setModel({...model, visible: false})
    }
    const handleRemoveOrder = async (key) => {
        await deleteOrder(key);
        setListOrder(prevState => [...prevState]);
    }

    return (<>
        <Button type="primary"
                style={{marginBottom: '20px'}}
                onClick={() => setModel({...model, visible: true, title: 'Add New Order'})}
        >
            Add New Order
        </Button>
        <Button type="primary"
                style={{marginLeft: '20px'}}
                onClick={handleSaveOrder}
        >
            Save
        </Button>
        <ModalAddOrder getOrder={getOrder} data={data} model={model}/>
        <ModalEditOrder onEdit={handleEditOrder} data={data} model={model}/>
        <Table columns={columns} dataSource={listOrder}/>
    </>)
}
export default Order