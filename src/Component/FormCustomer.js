import React, {useEffect} from 'react';
import {Form, Input, InputNumber} from "antd";

const layout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 15,
    },
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
const FormCustomer = (props) => {
    const {record = {}, form} = props;
    const {name = '', age = 0, address = ''} = record;

    useEffect(() => {
        form.setFieldsValue({name, age, address})
    }, [record]);

    return (
        <Form {...layout}
              labelAlign={'left'}
              form={form}
              name="nest-messages"
              validateMessages={validateMessages}
        >
            <Form.Item name={'name'} label="Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'age'} label="Age" rules={[{required: true, type: 'number', min: 0, max: 99}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item name={'address'} label="Address" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
        </Form>
    );
};

export default FormCustomer;