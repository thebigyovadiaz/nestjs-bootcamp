import { IncomingMessage, ServerResponse } from 'http';
import { routeNotFound } from '../controller/routeNotFound';
import type { Handler, Middleware } from '../types';

// Routes config
const routes: Record<string, Handler> = {}

const register = (method: string, path: string, handler: any) => {
    routes[`${method}:${path}`] = handler
}

export const get = (path: string, handler: any) => {
    register("GET", path, handler)
}

export const post = (path: string, handler: any) => {
    register("POST", path, handler)
}

export const put = (path: string, handler: any) => {
    register("PUT", path, handler)
}

export const del = (path: string, handler: any) => {
    register("DELETE", path, handler)
}

// Middlewares config
const middlewares: Middleware[] = []
export const use = (middleware: any) => {
    middlewares.push(middleware)
}

export const resolve = (key: string, req: IncomingMessage, res: ServerResponse): void | ServerResponse => {
    const handler: any = routes[key]
    if (!handler) return routeNotFound(req, res)

    let index = 0
    function next() {
        const middleware: any = middlewares[index++]
        if (!middleware) return handler(req, res)
        middleware(req, res, next)
    }

    next()
}
