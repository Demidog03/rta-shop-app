import {View} from "react-native";
import {Text} from "@/components/ui/text";
import {Stack} from "expo-router";
import React from "react";

function Cart() {
    return (
        <>
            <Stack.Screen
                options={{
                    presentation: 'modal',
                    title: 'Корзина',
                }}
            />
            <View>
                <Text>Cart</Text>
            </View>
        </>
    );
}

export default Cart;