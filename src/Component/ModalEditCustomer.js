import React, {useState} from 'react';
import {Button, Form, Modal} from "antd";
import FormCustomer from "./FormCustomer";
import {EditOutlined} from "@ant-design/icons";

const ModalEditCustomer = (props) => {
    const {record, onEditCustomer} = props;
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = async () =>{
        await form.validateFields();
        const newRecord = {...form.getFieldsValue(), key: record.key};
        onEditCustomer(newRecord);
        form.resetFields();
        setIsModalVisible(false);

    }

    return (<>
                <Button type='primary'
                        icon={<EditOutlined/>}
                        onClick={showModal}
                >Edit</Button>
                <Modal title='Edit Customer'
                       visible={isModalVisible}
                       onCancel={handleCancel}
                       onOk={handleOk}
                       okText='Save'
                >
                    <FormCustomer record={record} form={form}/>
                </Modal>
            </>

    )};

export default ModalEditCustomer;