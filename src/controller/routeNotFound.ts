import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';

export const routeNotFound = (req: IncomingMessage, res: ServerResponse) => (
    resJSON(res, 404, {
        success: false,
        message: "Route not found"
    })
)
