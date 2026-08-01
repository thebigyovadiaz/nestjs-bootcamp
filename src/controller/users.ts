import { ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Request, User } from '../interfaces';
import { usersService } from '../services/users.service';
import { usersRepository } from '../repositories/users.repository';
import { resultNotFound } from './resultNotFound';
import { CreateUserDto } from '../interfaces/dto';

export const getUsers = (req: Request, res: ServerResponse): void => {
    const users = usersService.findAll()
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
        data: req.body,
        timestamp: Date.now().toString()
    })
}

export const getUser = (req: Request, res: ServerResponse): void => {
    const user = usersService.findById(Number(req.params.id))
    if (!user) {
        return resultNotFound(req, res, "User Not Found")
    }

    return resJSON(res, 200, {
        success: true,
        message: "Users fetched successfully",
        data: user,
        timestamp: Date.now().toString()
    })
}
