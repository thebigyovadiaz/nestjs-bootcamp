import { ServerResponse } from 'http';
import { resJSON } from '../utils/response.util';
import { Request } from '../interfaces';

class GeneralController {
    constructor() {}

    home(req: Request, res: ServerResponse): void {
        return resJSON(res, 200, {
            success: true,
            message: "Welcome to NestJs Bootcamp",
            data: null,
            timestamp: Date.now().toString()
        })
    }

    badRequest(req: Request, res: ServerResponse): void {
        return resJSON(res, 400, {
            success: false,
            message: "Bad Request",
            data: null,
            timestamp: Date.now().toString()
        })
    }

    resultNotFound(req: Request, res: ServerResponse, message: string): void {
        return resJSON(res, 404, {
            success: false,
            message,
            data: null,
            timestamp: Date.now().toString()
        })
    }
}

export const generalCtrl = new GeneralController()
