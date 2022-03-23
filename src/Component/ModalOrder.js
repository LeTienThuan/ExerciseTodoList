import React from 'react';
import {Form, Modal} from "antd";
import FormOrder from "./FormOrder";

const ModalOrder = (props) => {
    const [form] = Form.useForm();
    const {model, data, getOrder} = props;
    const {visible, onCancel, title} = model;

    const handleOk = async () =>{
        await form.validateFields();
        getOrder(form.getFieldsValue())
        onCancel();
    }
    return (
        <Modal visible={visible}
               onCancel={onCancel}
               onOk={handleOk}
               title={title}
        >
            <FormOrder data={data} form={form}/>
        </Modal>
    );
};

export default ModalOrder;