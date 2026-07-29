import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import type { NextFunction } from '../types';

export const auth = (req: IncomingMessage, res: ServerResponse, next: NextFunction): void => {
    const token = req.headers.authorization
    if (!token) {
        return resJSON(res, 401, {
            success: false,
            message: "Invalid Token"
        })
    }

    next()
}
