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

module.exports = {
    routes,
    get,
    post,
    put,
    del
}
