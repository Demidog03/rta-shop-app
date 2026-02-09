import {StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Image} from "expo-image";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {Button, ButtonIcon} from "@/components/ui/button";
import {SlidersHorizontal} from "lucide-react-native";
import {mainBlackColor} from "@/constants/colors";
import {useEffect, useState} from "react";
import productsApi from "@/modules/products/api/products.api";
import {Product} from "@/modules/products/api/products.api.types";
import {Grid, GridItem} from "@/components/ui/grid";
import ProductCard from "@/modules/products/ui/ProductCard";

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        void getProducts()
    }, []);

    async function getProducts() {
        try {
           const response = await productsApi.getProducts();
            setProducts(response.data)
        }
         catch (e) {
            console.log(e);
         }
    }

  return (
      <SafeAreaView style={styles.container}>
          <Image
              source={require('@/assets/images/home-screen-main-image.jpg')}
              style={styles.mainImage}
          />
          <VStack style={styles.contentContainer}>
              <HStack  style={styles.headerContainer}>
                  <Heading style={styles.headerTitle}>Exclusive offer</Heading>
                    <Button variant="outline" size="md" action="secondary">
                        <ButtonIcon style={{ width: 24, height: 24 }} color={mainBlackColor} as={SlidersHorizontal} />
                    </Button>
              </HStack>
              <Grid
                  className="gap-4"
                  _extra={{
                      className: 'grid-cols-2',
                  }}
              >
                  {products.map((product, index) => (
                      <GridItem
                          key={index}
                          _extra={{
                              className: 'col-span-1',
                          }}
                      >
                          <ProductCard image={product.image} title={product.title} description={product.description} price={product.price}/>
                      </GridItem>
                  ))}
              </Grid>
          </VStack>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainImage: {
        height: 187,
        width: '100%',
        objectFit: 'cover'
    },
    contentContainer: {
        padding: 16
    },
    headerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: mainBlackColor,
    },
});
