import { ServerResponse } from 'http';
import { resJSON } from '../utils/response';
import { Request } from '../interfaces';
import { usersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { DetailsUserDto } from '../dto/details-user.dto';

export const getUsers = (req: Request, res: ServerResponse): void => {
    const users: DetailsUserDto[] = usersService.findAll()
    return resJSON(res, 200, {
        success: true,
        message: "Users fetched successfully",
        data: users,
        timestamp: Date.now().toString()
    })
}

export const newUser = (req: Request, res: ServerResponse): void => {
    const userData: CreateUserDto = req.body as CreateUserDto
    const user = usersService.create(userData)

    return resJSON(res, 201, {
        success: true,
        message: "User created successfully",
        data: user,
        timestamp: Date.now().toString()
    })
}

export const getUser = (req: Request, res: ServerResponse): void => {
    const user = usersService.findById(Number(req.params.id))

    return resJSON(res, 200, {
        success: true,
        message: "Users fetched successfully",
        data: user,
        timestamp: Date.now().toString()
    })
}
