import React from 'react';
import {Form, Modal} from "antd";
import FormProduct from "./FormProduct";
import moment from "moment";


const ModalProduct = (props) => {
    const [form] = Form.useForm();
    const {model, onUpdateData, onSaveData} = props;
    const {
        title = '', visible = false, product = {}, onCancel = () => {
        }
    } = model;

    const handleChangeData = async () => {
        await form.validateFields();
        const expiredDate = moment(form.getFieldValue('expiredDate')).format('yyyy-MM-DD');
        const record = {
            ...form.getFieldsValue(),
            expiredDate,
            key: product.key
        }
        product?.key
            ? onUpdateData(record)
            : onSaveData({
                ...form.getFieldsValue(),
                expiredDate
            });
        form.resetFields();
        onCancel();
    }
    return (
        <Modal visible={visible}
               onCancel={onCancel}
               title={title}
               onOk={handleChangeData}
        >
            <FormProduct form={form} product={product}/>
        </Modal>
    );
};

export default ModalProduct;