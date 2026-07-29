import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Product } from '../interfaces';

export const getProducts = (req: IncomingMessage, res: ServerResponse): void => {
    const products: Product[] = [
        {
            name: "towel",
            id: "1234",
            price: "5$"
        },
        {
            name: "paper",
            id: "1235",
            price: "10$"
        }
    ]

    return resJSON(res, 200, {
        success: true,
        message: "Products fetched successfully",
        data: products,
        timestamp: Date.now().toString()
    })
}
