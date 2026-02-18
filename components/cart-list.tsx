import {ScrollView, StyleSheet, View} from "react-native";
import {Card} from "@/components/ui/card";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {Divider} from "@/components/ui/divider";
import {useAppSelector} from "@/store/hooks";
import {Fragment, useEffect, useState} from "react";
import productsApi from "@/modules/products/api/products.api";
import {AxiosResponse} from "axios";
import {Product} from "@/modules/products/api/products.api.types";
import {CartProduct} from "@/store/slices/cart.slice";

function CartList() {
    const [products, setProducts] = useState<Product[]>([])
    const { productIds } = useAppSelector(state => state.cart)

    useEffect(() => {
        void fetchAllProducts(productIds)
    }, [productIds]);

    async function fetchAllProducts(productIds: CartProduct[]) {
        try {
            const ids = productIds.map(p => p.id.toString())
            const promises: Promise<AxiosResponse<Product, any, {}>>[] = []

            for (const id of ids) {
                promises.push(productsApi.getProductById(id))
            }

            const responses = await Promise.all(promises)

            const datas = responses.map(r => r.data)

            setProducts(datas)
        }
        catch (err) {
            console.log(err)
        }
    }

    console.log(products)

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                {products.map((p, index) => (
                    <Fragment key={index}>
                        <Card size="md" variant="elevated">
                            <Heading size="md" className="mb-1">
                                {p.title}
                            </Heading>
                            <Text size="sm">{p.description}</Text>
                        </Card>
                        <Divider />
                    </Fragment>
                ))}
            </View>
        </ScrollView>
    );
}

export default CartList;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
})