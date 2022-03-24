import React from 'react';
import {Form, message, Modal} from "antd";
import FormAddOrder from "./FormAddOrder";
import FormEditOrder from "./FormEditOrder";

const ModalOrder = (props) => {
    const [form] = Form.useForm();
    const {model = {}, data = {}, onAddOrder = (value) => {}, onEditOrder=(value)=>{}} = props;
    const {visible = false, onCancel = () => {}, title = '', record = {}} = model;
    const {key} = record;
    const isAddOrder = JSON.stringify(record) === '{}';

    const handleOk = async () => {
        if (isAddOrder) {
            await form.validateFields();
            onAddOrder(form.getFieldsValue())
            message.success('Add Successfully')
            onCancel();
        } else {
            await form.validateFields();
            const recordUpdate = {key,...form.getFieldsValue()}
            onEditOrder(recordUpdate);
            message.success('Edit Successfully')
        }
    }
    return (
        <Modal visible={visible}
               onCancel={onCancel}
               onOk={handleOk}
               title={title}
        >
            {isAddOrder ? <FormAddOrder data={data}
                                        form={form}/>
                : <FormEditOrder record={record}
                                 form={form}
                                 data={data}/>}
        </Modal>
    );
};

export default ModalOrder;