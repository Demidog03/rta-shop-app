import {Card} from "@/components/ui/card";
import {Box} from "@/components/ui/box";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {StyleSheet} from "react-native";
import {Image} from "expo-image";
import {mainBlackColor} from "@/constants/colors";

interface ProductCardProps {
    image: string
    title: string
    description: string
    price: number
}

function ProductCard({ image, price, title, description }: ProductCardProps) {
    return (
        <Card className="p-0">
            <Image
                source={{
                    uri: image
                }}
                style={styles.cardImage}
            />
            <Box style={styles.cardBody}>
                <VStack>
                    <Heading size="md" style={{marginBottom: 4}}>
                        {title}
                    </Heading>
                    <Text size="sm" style={{marginBottom: 8}}>
                        {description}
                    </Text>
                    <Text size="2xl" style={{ color: mainBlackColor, fontWeight: '700' }}>
                        ${price}
                    </Text>
                </VStack>
            </Box>
        </Card>
    );
}

export default ProductCard;


const styles = StyleSheet.create({
    cardImage: {
        width: '100%',
        height: 105,
        objectFit: 'cover',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    cardBody: {
        paddingHorizontal: 8,
        paddingVertical: 12
    }
});
