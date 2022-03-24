import {Form, Select} from "antd";
const {Option} = Select;

const FormAddOrder = (props) => {
    const {data, form} = props;
    const {customers, products}  = data;

    const handleSelect = (key) =>{
        form.setFieldsValue({Customers: key})
    }
    return (
        <Form form={form}>
            <Form.Item label='Customer' name='customer' rules={[{required: true}]}>
                <Select onChange={handleSelect}>
                    {customers.map(customer =>{
                        return <Option key={customer['key']}
                                       value={customer['name']}
                                >
                                    <b>Name:</b> {customer['name']}<br />
                                    <b>Address:</b> {customer['address']}
                                </Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item label='Product' name='products' rules={[{required: true}]}>
                <Select mode='multiple' onChange={handleSelect}>
                    {products.map(product =>{
                        return <Option key={product['key']}
                                       value={ product['key']}
                        >
                            <b>Name:</b> {product['name']}<br />
                        </Option>
                    })}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default FormAddOrder;