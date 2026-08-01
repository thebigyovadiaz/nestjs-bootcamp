import { ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Request } from '../interfaces';

export const resultNotFound = (req: Request, res: ServerResponse, message: string): void => {
    return resJSON(res, 404, {
        success: false,
        message,
        data: null,
        timestamp: Date.now().toString()
    })
}
