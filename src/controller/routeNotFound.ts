import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';

export const routeNotFound = (req: IncomingMessage, res: ServerResponse): void => {
    return resJSON(res, 404, {
        success: false,
        message: "Route not found",
        data: null,
        timestamp: Date.now().toString()
    })
}
