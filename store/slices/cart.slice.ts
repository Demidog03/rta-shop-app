import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CartProduct {
    id: number
    quantity: number
}

interface CartState {
    productIds: CartProduct[]
}

const initialState: CartState = {
    productIds: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<number>) => {
            if (!state.productIds.some(p => p.id === action.payload)) {
                state.productIds.push({
                    id: action.payload,
                    quantity: 1
                })
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            if (state.productIds.some(p => p.id === action.payload)) {
                state.productIds = state.productIds.filter(p => p.id !== action.payload)
            }
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer;