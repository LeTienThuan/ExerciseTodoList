import React, {useEffect} from 'react';
import {DatePicker, Form, Input, InputNumber} from "antd";
import moment from "moment";

const layout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 15,
    },
    labelAlign: 'left'
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "${label} is required!",
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-disable no-template-curly-in-string */
const dateFormat = 'YYYY-MM-DD';

const FormProduct = (props) => {
    const {form, product} = props;
    const {name = '', trademark = '', expiredDate = '2022-02-02', price = 0} = product;

    useEffect(() => {
        form.setFieldsValue({name, trademark, expiredDate: moment(expiredDate), price});
    }, [product]);

    return (
        <Form form={form} {...layout} validateMessages={validateMessages}>
            <Form.Item name='name' label='Name' rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='trademark' label='Trademark' rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='expiredDate' label='Expired Date' rules={[{required: true}]}>
                <DatePicker name='expiredDate' format={dateFormat}/>
            </Form.Item>
            <Form.Item name='price' label='Price' rules={[{required: true, type: 'number', min: 1000, max: 50000000}]}>
                <InputNumber/>
            </Form.Item>
        </Form>
    );
};

export default FormProduct;