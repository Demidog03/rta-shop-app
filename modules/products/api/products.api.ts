import axios from "axios";
import {GetProductsResponse} from "@/modules/products/api/products.api.types";

const baseUrl = 'https://fakestoreapi.com';

function getProducts() {
    return axios.get<GetProductsResponse>(`${baseUrl}/products`);
}

const productsApi = { getProducts };

export default productsApi;