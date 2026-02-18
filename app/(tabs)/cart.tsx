import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import CartList from "@/components/cart-list";

function Cart() {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <CartList/>
            </SafeAreaView>
        </>
    );
}

export default Cart;

