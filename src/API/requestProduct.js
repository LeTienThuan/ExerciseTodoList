export const getProducts = async () =>{
    const response = await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/products.json');
    const responseData = await response.json();

    const loadedProduct = [];

    for (const key in responseData) {
        loadedProduct.push({
            key: key,
            name: responseData[key].name,
            trademark: responseData[key].trademark,
            expiredDate: responseData[key].expiredDate,
            price: responseData[key].price
        })
    }
    return loadedProduct;
}
export const editProduct = async (key,record) =>{
    try {
        await fetch(`https://managershopping-dca9a-default-rtdb.firebaseio.com/products/${key}.json`, {
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
export const addProduct = async (record) => {
    try {
        await fetch('https://managershopping-dca9a-default-rtdb.firebaseio.com/products.json', {
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
export const  deleteProduct = async (key) =>{
    await fetch(`https://managershopping-dca9a-default-rtdb.firebaseio.com/products/${key}.json`,{
        method: 'DELETE'
    })
}