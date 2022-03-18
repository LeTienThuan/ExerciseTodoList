import React from 'react';
import {Form, message, Modal} from "antd";
import FormCustomer from "./FormCustomer";

let customerKey = 4;

const ModalCustomer = (props) => {
    const {model = {}, onSaveData, onUpdateData} = props;
    const {visible = false, customer = {}, title = '', inform='', onCancel = () => {}} = model;
    const [form] = Form.useForm()

    const handleChangeData = async () => {
        await form.validateFields();
        customer?.key
            ? onUpdateData({...form.getFieldsValue(), key: customer.key})
            : onSaveData({...form.getFieldsValue(), key: customerKey++});
        message.success(inform);
        form.resetFields();
        onCancel();
    }

    return (
        <Modal visible={visible}
               onCancel={onCancel}
               onOk={handleChangeData}
               title={title}
        >
            <FormCustomer customer={customer}
                          form={form}
            />
        </Modal>
    );
};

export default ModalCustomer;