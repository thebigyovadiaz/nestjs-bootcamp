import { IncomingMessage, ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { User } from '../interfaces';
import { CreateUserDto } from '../interfaces/dto';

export const getUsers = (req: IncomingMessage, res: ServerResponse): void => {
    const users: User[] = [
        {
            name: "Peter Rose",
            id: "1234",
            email: "peterr@gmail.com"
        },
        {
            name: "Elena Petric",
            id: "12345",
            email: "petricelena@gmail.com"
        }
    ]

    return resJSON(res, 200, {
        success: true,
        message: "Users fetched successfully",
        data: users,
        timestamp: Date.now().toString()
    })
}

export const newUser = (req: IncomingMessage, res: ServerResponse): void => {
    const users: User[] = []
    return resJSON(res, 201, {
        success: true,
        message: "User created successfully",
        data: users,
        timestamp: Date.now().toString()
    })
}
