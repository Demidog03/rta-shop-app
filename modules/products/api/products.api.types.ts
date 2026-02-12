export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        count: number,
        rate: number
    }
}

export type GetProductsResponse = Product[]
export type GetProductByIdResponse = Product