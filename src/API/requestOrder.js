export const addOrder = async (record) => {
    try {
        await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify(record),
            headers: {

                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        console.log(e)
    }
}
export const getOrders = async () =>{
    const response = await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/orders.json');
    const responseData = await response.json();

    const loadedCustomer = [];

    for (const key in responseData) {
        loadedCustomer.push({
            key: key,
            customer: responseData[key].customer,
            product: responseData[key].product,
            quantity: responseData[key].quantity,
            price: responseData[key].price,
            total: responseData[key].total,
            isChanged: responseData[key].isChanged
        })
    }
    return loadedCustomer;
}
export const  deleteOrder = async (key) =>{
    await fetch(`https://managershopping-dca9a-default-rtdb.firebaseio.com/orders/${key}.json`,{
        method: 'DELETE'
    })
}