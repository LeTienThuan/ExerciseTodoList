import React from 'react';
import {Form, Modal} from "antd";
import FormEditOrder from "./FormEditOrder";


const ModalEditOrder = (props) => {
    const [form] = Form.useForm();
    const {data, model, onEdit} = props;
    const {visible, onCancel, title, record} = model;
    const {key} = record;

    const handleOk = async () => {
        const result = form.getFieldsValue();
        const {price, quantity} = result;
        const total = quantity * price;
        const newRecord = {...result, total, key};
        await onEdit(newRecord)
    }
    return (
        <Modal title={title} visible={visible} onCancel={onCancel} onOk={handleOk}>
            <FormEditOrder onEdit={onEdit} record={record} data={data} form={form}/>
        </Modal>
    );
};

export default ModalEditOrder;