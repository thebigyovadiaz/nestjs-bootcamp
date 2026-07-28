import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import type { Next } from '../types';

export const auth = (req: IncomingMessage, res: ServerResponse, next: Next): void | ServerResponse => {
    const token = req.headers.authorization
    if (!token) {
        return resJSON(res, 401, {
            success: false,
            message: "Invalid Token"
        })
    }

    next()
}
