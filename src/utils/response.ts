import { ServerResponse } from 'http';

export const resJSON = (res: ServerResponse, status: number, data: unknown): void => {
    res.writeHead(status, {
        "Content-Type": "application/json"
    })

    res.end(JSON.stringify(data))
}
