import { IncomingMessage, ServerResponse } from 'http';
import type { NextFunction } from '../types';

export const logger = (req: IncomingMessage, res: ServerResponse, next: NextFunction): void => {
    const start = Date.now()

    res.on("finish", () => {
        const end = Date.now()
        console.log(`${req.method} ${req.url} ${res.statusCode} - ${end - start}ms`)
    })

    next()
}
