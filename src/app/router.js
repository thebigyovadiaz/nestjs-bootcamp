const routeNotFound = require("../controller/routeNotFound")
const logger = require("../middlewares/logger")

const routes = {}

const register = (method, path, handler) => {
    routes[`${method}:${path}`] = handler
}

const get = (path, handler) => {
    register("GET", path, handler)
}

const post = (path, handler) => {
    register("POST", path, handler)
}

const put = (path, handler) => {
    register("PUT", path, handler)
}

const del = (path, handler) => {
    register("DELETE", path, handler)
}

const middlewares = []
const use = (middleware) => {
    middlewares.push(middleware)
}

const resolve = (key, req, res) => {
    const handler = routes[key]
    if (!handler) return routeNotFound(req, res)

    let index = 0
    function next() {
        const middleware = middlewares[index++]
        if (!middleware) return handler(req, res)
        middleware(req, res, next)
    }

    next()
}

module.exports = {
    routes,
    get,
    post,
    put,
    del,
    middlewares,
    use,
    resolve
}
