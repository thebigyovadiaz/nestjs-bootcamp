import { ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Request } from '../interfaces';

export const badRequest = (req: Request, res: ServerResponse): void => {
    return resJSON(res, 400, {
        success: false,
        message: "Bad Request",
        data: null,
        timestamp: Date.now().toString()
    })
}
