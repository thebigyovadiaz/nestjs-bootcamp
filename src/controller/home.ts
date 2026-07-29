import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';

export const home = (req: IncomingMessage, res: ServerResponse): void => {
    return resJSON(res, 200, {
        success: true,
        message: "Welcome to NestJs Bootcamp",
        data: null,
        timestamp: Date.now().toString()
    })
}
