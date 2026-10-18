import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
    name : "cart",
    initialState : {
        items : []
    },
    reducers : {
        addItem : (state,action) =>{
            const exists = state.items.find((item)=>item._id === action.payload._id)
            if(!exists){
                state.items.push({...action.payload,qty:1})
            }
        },
        incQty : (state,action) =>{
            const itemProd = state.items.find((item)=>item._id === action.payload)
            if(itemProd){
                itemProd.qty += 1
            }
        },
        decQty : (state,action) =>{
            const itemProd = state.items.find((item)=>item._id === action.payload)
            if(itemProd){
                if(itemProd.qty > 1){
                    itemProd.qty -= 1
                }else{
                    itemProd.qty = 0
                }
            } 
        },
        clearCart : (state) =>{
            state.items = []
        },

    }
})

export const {addItem,incQty,decQty,clearCart} = productSlice.actions;
export default productSlice.reducer;