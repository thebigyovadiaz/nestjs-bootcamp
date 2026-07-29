import { IncomingMessage, ServerResponse } from 'http';
import { routeNotFound } from '../controller/routeNotFound';
import type { Handler, Middleware, NextFunction } from '../types';

// Routes config
const routes: Record<string, Handler> = {}

const register = (method: string, path: string, handler: Handler) => {
    routes[`${method}:${path}`] = handler
}

export const get = (path: string, handler: Handler) => {
    register("GET", path, handler)
}

export const post = (path: string, handler: Handler) => {
    register("POST", path, handler)
}

export const put = (path: string, handler: Handler) => {
    register("PUT", path, handler)
}

export const del = (path: string, handler: Handler) => {
    register("DELETE", path, handler)
}

// Middlewares config
const middlewares: Middleware[] = []
export const use = (middleware: Middleware) => {
    middlewares.push(middleware)
}

export const resolve = (key: string, req: IncomingMessage, res: ServerResponse): void => {
    const handler = routes[key]
    if (!handler) return routeNotFound(req, res)

    let index = 0
    const next: NextFunction = () => {
        const middleware: Middleware = middlewares[index++]
        if (!middleware) return handler(req, res)
        middleware(req, res, next)
    }

    next()
}
