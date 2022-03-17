import React, {useState} from 'react';
import {Button, Form, Modal, message} from "antd";
import FormCustomer from "./FormCustomer";

const ModalAddCustomer = (props) => {
    const {onAddCustomer} = props;
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        await form.validateFields();
        form.submit();
        message.success('Add Successfully');
        onAddCustomer(form.getFieldsValue());
        form.resetFields();
        setIsModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Button type="primary"
                    onClick={showModal}
                    style={{marginBottom: '20px'}}
            >Add New Customer</Button>
            <Modal title="Add New Customer"
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okText='Save'
            >
                <FormCustomer form={form} />
            </Modal>
        </>
    );
};

export default ModalAddCustomer;