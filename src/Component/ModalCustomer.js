import React from 'react';
import {Form, Modal} from "antd";
import FormCustomer from "./FormCustomer";

const ModalCustomer = (props) => {
    const {model={}, onCancel} = props;
    const {visible=false, customer={}} = model;
    const [form] = Form.useForm()
    return (
        <Modal visible={visible} onCancel={onCancel}>
            <FormCustomer customer={customer} form={form} />
        </Modal>
    );
};

export default ModalCustomer;