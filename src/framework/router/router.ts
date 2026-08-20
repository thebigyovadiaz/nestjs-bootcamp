import { ServerResponse, IncomingMessage } from 'http';
import type { Handler, HttpMethod } from '../../types/index.type';
import { Request, RouteDetails } from '../../interfaces';
import { parseRequest, parseUrlPath } from '../../utils/parse-url.util';
import { parseBody } from '../../utils/parse-body.util';
import { methodsWithBody } from '../../utils/utilities.util';
import { handleError } from '../../utils/error-handler.util';
import { runMiddlewares } from '../../middlewares/register';
import { generalCtrl } from '../../controller/general.controller';

// Routes config
const routes: RouteDetails[] = []

export const register = (method: HttpMethod, path: string, handler: Handler) => {
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

export const resolve = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
        const request = req as Request
        request.params = {}

        const {method, partsUrl, query} = parseRequest(request)
        request.query = query

        for (const route of routes) {
            // validar method
            if (route.method !== method) {
                continue
            }

            const routeParts = parseUrlPath(route.path)

            // Equal segments length
            if (routeParts.length !== partsUrl.length) {
                continue
            }

            // Temporal params
            const params: Record<string, string> = {}

            let matched = true

            // Compare segments by segments
            for (let i = 0; i < routeParts.length; i++) {
                const routeSegment = routeParts[i]
                const requestSegment = partsUrl[i]

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

                if (methodsWithBody.has(method)) {
                    try {
                        request.body = await parseBody(request)
                    } catch (error) {
                        return generalCtrl.badRequest(request, res)
                    }
                }

                return runMiddlewares(request, res, route.handler)
            }
        }

        return generalCtrl.resultNotFound(request, res, "Rout Not Found")
    } catch (error) {
        handleError(error, res)
    }
}
