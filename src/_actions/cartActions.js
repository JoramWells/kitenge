import axios from 'axios'
import { ADD_TO_CART } from '../_constants/cartConstants'

const addToCart = (productId, qty) => async (dispatch)=>{
    try {
        const {data} = await axios.get(`http://localhost:5000/product/${productId}`)
        dispatch({
            type:ADD_TO_CART, payload:{
                product:data.id,
                name:data.name,
                image:data.image,
                price:data.price,
                stock:data.stock,
                qty
            }
        })
        
    } catch (error) {
        
    }
}

export {addToCart}