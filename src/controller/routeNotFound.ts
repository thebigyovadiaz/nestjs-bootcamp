import { ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Request } from '../interfaces';

export const routeNotFound = (req: Request, res: ServerResponse): void => {
    return resJSON(res, 404, {
        success: false,
        message: "Route not found",
        data: null,
        timestamp: Date.now().toString()
    })
}
