import axios from "axios";
import {GetProductByIdResponse, GetProductsResponse} from "@/modules/products/api/products.api.types";

const baseUrl = 'https://fakestoreapi.com';

function getProducts() {
    return axios.get<GetProductsResponse>(`${baseUrl}/products`);
}

function getProductById(id: string) {
    return axios.get<GetProductByIdResponse>(`${baseUrl}/products/${id}`);
}

const productsApi = { getProducts, getProductById };

export default productsApi;