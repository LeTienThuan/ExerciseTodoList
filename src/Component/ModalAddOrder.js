import React from 'react';
import {Form, Modal} from "antd";
import FormAddOrder from "./FormAddOrder";

const ModalAddOrder = (props) => {
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
            <FormAddOrder data={data} form={form}/>
        </Modal>
    );
};

export default ModalAddOrder;