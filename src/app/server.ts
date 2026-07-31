import http, { ServerResponse, IncomingMessage } from 'http';
import { get, post, resolve } from './router';

import { home } from '../controller/home'
import { getProducts } from '../controller/products'
import { getUser, getUsers, newUser } from '../controller/users'
import { logger } from '../middlewares/logger'
import { auth } from '../middlewares/auth'
import { use } from '../middlewares/register';

// Middleware Register
use(logger)
use(auth)

// Routes Register
get("/", home)
get("/products", getProducts)
get("/users", getUsers)
get("/users/:id", getUser)
get("/users/:id/orders/:order", getUser)
post("/users", newUser)

export const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    return resolve(req, res)
})

server.listen(3000, () => console.log('Server running in local port 3000'))
