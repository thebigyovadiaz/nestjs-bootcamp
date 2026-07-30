import { ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Product, Request } from '../interfaces';

export const getProducts = (req: Request, res: ServerResponse): void => {
    const products: Product[] = [
        {
            name: "towel",
            id: "0001",
            price: "5$",
            stock: 20,
            createdAt: Date.now().toString()
        },
        {
            name: "paper",
            id: "0002",
            price: "10$",
            stock: 20,
            createdAt: Date.now().toString()
        }
    ]

    return resJSON(res, 200, {
        success: true,
        message: "Products fetched successfully",
        data: products,
        timestamp: Date.now().toString()
    })
}
