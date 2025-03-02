import axios from 'axios'

export const fetchCart = async (setCartItems) => {
    try {
        const response = await axios.get(`/api/products/cart/get/${JSON.parse(localStorage.getItem('authUser'))._id}`)
        const data = await response.data
        localStorage.setItem('cart', JSON.stringify(data))
        return data
    } catch (error) {
        console.log(error)
    }
}


