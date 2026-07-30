import { ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Request, User } from '../interfaces';

export const getUsers = (req: Request, res: ServerResponse): void => {
    const users: User[] = [
        {
            name: "Peter Rose",
            id: "1234",
            email: "peterr@gmail.com",
            createdAt: Date.now().toString(),
            isActive: true
        },
        {
            name: "Elena Petric",
            id: "12345",
            email: "petricelena@gmail.com",
            createdAt: Date.now().toString(),
            isActive: true
        }
    ]

    return resJSON(res, 200, {
        success: true,
        message: "Users fetched successfully",
        data: users,
        timestamp: Date.now().toString()
    })
}

export const newUser = (req: Request, res: ServerResponse): void => {
    const users: User[] = []
    return resJSON(res, 201, {
        success: true,
        message: "User created successfully",
        data: users,
        timestamp: Date.now().toString()
    })
}

export const getUser = (req: Request, res: ServerResponse): void => {
    const users: User[] = [
        {
            name: "Peter Rose",
            id: "1234",
            email: "peterr@gmail.com",
            createdAt: Date.now().toString(),
            isActive: true
        },
        {
            name: "Elena Petric",
            id: "12345",
            email: "petricelena@gmail.com",
            createdAt: Date.now().toString(),
            isActive: true
        }
    ]

    return resJSON(res, 200, {
        success: true,
        message: "Users fetched successfully",
        data: req.params,
        timestamp: Date.now().toString()
    })
}
