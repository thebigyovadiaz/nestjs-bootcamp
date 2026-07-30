import { ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Request } from '../interfaces';

export const home = (req: Request, res: ServerResponse): void => {
    return resJSON(res, 200, {
        success: true,
        message: "Welcome to NestJs Bootcamp",
        data: null,
        timestamp: Date.now().toString()
    })
}
