import React, {useEffect, useState} from 'react';
import {Form, InputNumber, Select} from "antd";

const {Option} = Select;
const layout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 15,
    },
};

const FormEditOrder = (props) => {
    const {form, data, record} = props;
    const[orderDetail, setOrderDetail] = useState(record);
    const {customers, products} = data;

    useEffect(()=>{
        setOrderDetail(record)
        const {customer, product, quantity, price, total} = orderDetail;
        form.setFieldsValue({customer, product, price, total, quantity})
    })
    const handleOnChangeQuantity = () =>{
        const quantity = form.getFieldValue('quantity');
        if(quantity !== null){
            let {price, total} = orderDetail;
            total = price * quantity;
            form.setFieldsValue({total})
        }
    }

    return (
        <Form {...layout} form={form} labelAlign={'left'}>
            <Form.Item label='Customer' name='customer' rules={[{required: true}]}>
                <Select>
                    {customers.map(customer => {
                        return <Option key={customer['key']}
                                       value={customer['name']}
                        >
                            <b>Name:</b> {customer['name']}<br/>
                            <b>Address:</b> {customer['address']}
                        </Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item label='Product' name='product' rules={[{required: true}]}>
                <Select>
                    {products.map(product => {
                        return <Option key={product['key']}
                                       value={product['key']}
                        >
                            <b>Name:</b> {product['name']}<br/>
                        </Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item label='Quantity' name='quantity' rules={[{required: true}]}>
                <InputNumber onChange={handleOnChangeQuantity}/>
            </Form.Item>
            <Form.Item label='Price' name='price'>
                <InputNumber readOnly={true}/>
            </Form.Item>
            <Form.Item label='Total' name='total' >
                <InputNumber readOnly={true}/>
            </Form.Item>
        </Form>
    );
};

export default FormEditOrder;