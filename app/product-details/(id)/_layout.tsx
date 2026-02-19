import {ScrollView, StyleSheet, View} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import React, {useEffect, useMemo, useState} from "react";
import productsApi from "@/modules/products/api/products.api";
import {Product} from "@/modules/products/api/products.api.types";
import {Image} from "expo-image";
import {Heading} from "@/components/ui/heading";
import {AntDesign} from "@expo/vector-icons";
import {Text} from "@/components/ui/text";
import {Check, ShoppingCartIcon, Truck} from "lucide-react-native";
import {Divider} from "@/components/ui/divider";
import {Fab, FabIcon, FabLabel} from "@/components/ui/fab";
import {AddIcon} from "@/components/ui/icon";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addToCart, removeFromCart} from "@/store/slices/cart.slice";
import SwipeableModal from "@/components/swipeable-modal";
import CartList from "@/components/cart-list";

function ProductDetailsLayout() {
    const insets = useSafeAreaInsets();
    const [product, setProduct] = useState<Product | undefined>()
    const [visible, setVisible] = useState(false)
    const { id } = useLocalSearchParams()
    const { productIds } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const isInCart = useMemo(() => productIds.some(p => p.id === Number(id)), [productIds, id])

    useEffect(() => {
        if (typeof id === 'string') {
            void getProducts(id)
        }
    }, [id]);

    async function getProducts(id: string) {
        try {
            const response = await productsApi.getProductById(id);
            setProduct(response.data)
        }
        catch (e) {
            console.log(e);
        }
    }

    function addToBag() {
        if (product?.id) {
            dispatch(addToCart(product.id))
        }
    }

    function removeFromBag() {
        if (product?.id) {
            dispatch(removeFromCart(product.id))
        }
    }

    function onClose() {
        setVisible(false);
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Детали продукта',
                    headerBackTitle: 'Home'
                }}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView >
                    <Image contentFit="contain" source={product?.image} style={{ height: 276, width: '100%'}} />
                    <View style={styles.container}>
                        <View style={styles.headingContainer}>
                            <Heading style={styles.title}>{product?.title}</Heading>
                            <Heading style={styles.price}>${product?.price}</Heading>
                        </View>
                        <View style={styles.ratingAndDeliveryContainer}>
                            <View style={styles.ratingContainer}>
                                <AntDesign name="star" size={24} color="rgba(251, 157, 75, 1)" />
                                <Text style={styles.rating}>{product?.rating.rate ?? 0}/5</Text>
                                <Text style={styles.count}>({product?.rating.count ?? 0})</Text>
                            </View>
                            <View style={styles.deliveryContainer}>
                                <Truck size={24}/>
                                <Text style={styles.delivery}>Free Delivery</Text>
                            </View>
                        </View>
                        <Divider className="my-4" />
                        <Text style={styles.description}>{product?.description}</Text>
                        <Text style={styles.description}>{product?.description}</Text>
                        <Text style={styles.description}>{product?.description}</Text>
                    </View>
                </ScrollView>
                {!isInCart && (
                    <Fab
                        size="lg"
                        placement="bottom center"
                        isHovered={false}
                        isDisabled={false}
                        isPressed={false}
                        className="rounded-xl"
                        style={{
                            marginBottom: insets.bottom + 5,
                        }}
                        onPress={addToBag}
                    >
                        <FabIcon as={AddIcon} />
                        <FabLabel>Add to bag</FabLabel>
                    </Fab>
                )}
                {isInCart && (
                    <>
                        <Fab
                            size="lg"
                            placement="bottom center"
                            isHovered={false}
                            isDisabled={false}
                            isPressed={false}
                            className="rounded-xl"
                            style={{
                                marginBottom: insets.bottom + 5,
                                backgroundColor: 'green'
                            }}
                            onPress={removeFromBag}
                        >
                            <FabIcon color="white" as={Check} />
                            <FabLabel>Added</FabLabel>
                        </Fab>
                        <Fab
                            size="sm"
                            placement="bottom center"
                            isHovered={false}
                            isDisabled={false}
                            isPressed={false}
                            className="rounded-xl"
                            style={{
                                marginBottom: insets.bottom + 12,
                                right: 20
                            }}
                            onPress={() => setVisible(true)}
                        >
                            <FabIcon color="white" as={ShoppingCartIcon} />
                            <FabLabel>Open cart</FabLabel>
                        </Fab>
                    </>
                )}
            </SafeAreaView>
            <SwipeableModal top={150} visible={visible} onClose={onClose}>
                <CartList/>
            </SwipeableModal>
        </>
    );
}

export default ProductDetailsLayout;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        flex: 1,
        paddingBottom: 100
    },
    headingContainer: {
        marginBottom: 16
    },
    title: {
        fontSize: 24,
        marginBottom: 8
    },
    price: {
        fontSize: 24,
        color: 'rgba(52, 131, 82, 1)',
        marginBottom: 11
    },
    ratingAndDeliveryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    rating: {
        fontSize: 18,
        color: 'black',
        fontWeight: '700'
    },
    count: {
        fontSize: 18,
        color: 'rgba(115, 115, 115, 1)'
    },
    deliveryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    delivery: {
        color: 'rgba(64, 64, 64, 1)',
        fontWeight: 500,
    },
    description: {
        color: 'rgba(64, 64, 64, 1)'
    },
})