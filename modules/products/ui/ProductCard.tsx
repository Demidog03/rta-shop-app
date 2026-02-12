import {Card} from "@/components/ui/card";
import {Box} from "@/components/ui/box";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Image} from "expo-image";
import {mainBlackColor} from "@/constants/colors";
import {RelativePathString, useRouter} from "expo-router";

interface ProductCardProps {
    id: number
    image: string
    title: string
    description: string
    price: number
}

function ProductCard({ id, image, price, title, description }: ProductCardProps) {
    const router = useRouter()

    function goToProductPage() {
        if (id) {
            router.push({
                pathname: "/product-details/(id)" as RelativePathString,
                params: {
                    id,
                },
            })
        }
    }

    return (
        <TouchableOpacity onPress={goToProductPage}>
            <Card className="p-0">
                <Image
                    contentFit="contain"
                    source={{
                        uri: image
                    }}
                    style={styles.cardImage}
                />
                <Box style={styles.cardBody}>
                    <VStack>
                        <Heading numberOfLines={2} ellipsizeMode='tail' size="md" style={styles.title}>
                            {title}
                        </Heading>
                        <Text numberOfLines={4} ellipsizeMode='tail' size="sm" style={{marginBottom: 8}}>
                            {description}
                        </Text>
                        <Text size="2xl" style={{ color: mainBlackColor, fontWeight: '700' }}>
                            ${price}
                        </Text>
                    </VStack>
                </Box>
            </Card>
        </TouchableOpacity>
    );
}

export default ProductCard;


const styles = StyleSheet.create({
    cardImage: {
        width: '100%',
        height: 105,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    cardBody: {
        paddingHorizontal: 8,
        paddingVertical: 12
    },
    title: {
        marginBottom: 4,
    }
});
