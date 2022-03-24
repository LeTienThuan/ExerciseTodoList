import React, {useEffect} from 'react';
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
    const {form, data, record, onEdit} = props;
    console.log(record)
    const {customer, product, quantity, price, total, key} = record;
    const {customers, products} = data;

    const handleSelect = (key) => {
        form.setFieldsValue({Customers: key})
    }
    const handleOnchangeQuantity = () =>{
        const record = form.getFieldsValue();
        let {quantity, price, total} = record;
        total = price * quantity;
        return {...record, quantity, price, total, key};
    }
    useEffect(() =>{
        form.setFieldsValue({customer, product, price, total, quantity})
    },[record])

    return (
        <Form {...layout} form={form} labelAlign={'left'}>
            <Form.Item label='Customer' name='customer' rules={[{required: true}]}>
                <Select value={customer}  onChange={handleSelect}>
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
                <Select onChange={handleSelect}>
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
                <InputNumber onChange={handleOnchangeQuantity}/>
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