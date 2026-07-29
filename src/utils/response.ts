import { ServerResponse } from 'http';
import { ApiResponse } from '../interfaces';

export const resJSON = <T>(res: ServerResponse, status: number, data: ApiResponse<T>): void => {
    res.writeHead(status, {
        "Content-Type": "application/json"
    })

    res.end(JSON.stringify(data))
}
