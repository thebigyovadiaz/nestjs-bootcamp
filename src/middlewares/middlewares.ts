import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response.util';
import type { Handler, Middleware, NextFunction } from '../types/index.type';
import { Request } from '../interfaces';

class Middlewares {
    private middlewares: Middleware[] = []

    use(middleware: Middleware) {
        this.middlewares.push(middleware)
    }

    auth(req: IncomingMessage, res: ServerResponse, next: NextFunction): void {
        const token = req.headers.authorization
        if (!token) {
            return resJSON(res, 401, {
                success: false,
                message: "Invalid Token",
                data: null,
                timestamp: Date.now().toString()
            })
        }

        next()
    }

    logger(req: IncomingMessage, res: ServerResponse, next: NextFunction): void {
        const start = Date.now()

        res.on("finish", () => {
            const end = Date.now()
            console.log(`${req.method} ${req.url} ${res.statusCode} - ${end - start}ms`)
        })

        next()
    }

    runMiddlewares(request: Request, res: ServerResponse, handler: Handler) {
        let index = 0
        const next: NextFunction = () => {
            const middleware: Middleware = this.middlewares[index++]
            if (!middleware) return handler(request, res)
            middleware(request, res, next)
        }

        next()
    }
}

export const middlewares = new Middlewares()
