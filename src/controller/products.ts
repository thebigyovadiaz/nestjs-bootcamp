import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';

export const getProducts = (req: IncomingMessage, res: ServerResponse): void => (
    resJSON(res, 200, {
        success: true,
        message: "Products fetched successfully",
        data: [
            {
                name: "towel",
                ID: "1234",
                price: "5$"
            },
            {
                name: "paper",
                ID: "1235",
                price: "10$"
            }
        ]
    })
)
