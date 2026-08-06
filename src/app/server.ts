import http, { ServerResponse, IncomingMessage } from 'http';
import { resolve } from './router';

// Config Application
import './bootstrap'

export const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    return resolve(req, res)
})

server.listen(3000, () => console.log('Server running in local port 3000'))
