export const getCustomers = async () =>{
    const response = await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/customers.json');
    const responseData = await response.json();

    const loadedCustomer = [];

    for (const key in responseData) {
        loadedCustomer.push({
            key: key,
            name: responseData[key].name,
            age: responseData[key].age,
            address: responseData[key].address
        })
    }
    return loadedCustomer;
}
export const editCustomer = async (key,record) =>{
    try {
        await fetch(`https://managershopping-dca9a-default-rtdb.firebaseio.com/customers/${key}.json`, {
            method: 'PUT',
            body: JSON.stringify(record),
            headers: {

                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        console.log(e)
    }
}
export const addCustomer = async (record) => {
    try {
        await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/customers.json', {
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
export const  deleteCustomer = async (key) =>{
    await fetch(`https://managershopping-dca9a-default-rtdb.firebaseio.com/customers/${key}.json`,{
        method: 'DELETE'
    })
}