import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';

export const getUsers = (req: IncomingMessage, res: ServerResponse): void => (
    resJSON(res, 200, {
        success: true,
        message: "Users fetched successfully",
        data: [
            {
            name: "Peter Rose",
            ID: "1234",
            email: "peterr@gmail.com"
            },
            {
                name: "Elena Petric",
                ID: "12345",
                email: "petricelena@gmail.com"
            }
        ]
    })
)

export const newUser = (req: IncomingMessage, res: ServerResponse): void => (
    resJSON(res, 201, {
        success: true,
        message: "User created successfully"
    })
)
