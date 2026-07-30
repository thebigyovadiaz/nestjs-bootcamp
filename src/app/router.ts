import { ServerResponse, IncomingMessage } from 'http';
import { routeNotFound } from '../controller/routeNotFound';
import type { Handler, Middleware, NextFunction } from '../types';
import { Request, RouteDetails } from '../interfaces';
import { parseUrlPath } from '../utils/parseUrl';

// Routes config
const routes: RouteDetails[] = []

const register = (method: string, path: string, handler: Handler) => {
    routes.push({
        method,
        path,
        handler
    })
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

export const resolve = (req: IncomingMessage, res: ServerResponse): void => {
    const request = req as Request
    request.params = {}

    const url = new URL(req.url || "localhost", `http://${req.headers.host}`)

    const requestParts = parseUrlPath(url.pathname)

    for (const route of routes) {
        // validar method
        if (route.method !== req.method) {
            continue
        }

        const routeParts = parseUrlPath(route.path)

        // Equal segments length
        if (routeParts.length !== requestParts.length) {
            continue
        }

        // Temporal params
        const params: Record<string, string> = {}

        let matched = true

        // Compare segments by segments
        for (let i = 0; i < routeParts.length; i++) {
            const routeSegment = routeParts[i]
            const requestSegment = requestParts[i]

            // If a params
            if (routeSegment.startsWith(":")) {
                const key = routeSegment.substring(1)
                params[key] = requestSegment
                continue
            }

            if (routeSegment !== requestSegment) {
                matched = false
                break
            }
        }

        if (matched) {
            request.params = params
            let index = 0
            const next: NextFunction = () => {
                const middleware: Middleware = middlewares[index++]
                if (!middleware) return route.handler(request, res)
                middleware(request, res, next)
            }

            return next()
        }
    }

    return routeNotFound(request, res)
}
