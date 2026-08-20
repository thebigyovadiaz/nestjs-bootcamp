import { ServerResponse } from 'http';
import { resJSON } from '../utils/response.util';
import { Request } from '../interfaces';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { DetailsUserDto } from '../dto/details-user.dto';
import { Controller } from '../framework/decorators/controller.decorator';
import { Get, Post } from '../framework/decorators/http.decorator';

@Controller("/users")
export class UserController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get("/")
    getUsers(req: Request, res: ServerResponse): void {
        console.log('controller');
        const users: DetailsUserDto[] = this.usersService.findAll()
        return resJSON(res, 200, {
            success: true,
            message: "Users fetched successfully",
            data: users,
            timestamp: Date.now().toString()
        })
    }

    @Post("/new-user")
    newUser(req: Request, res: ServerResponse): void {
        const userData: CreateUserDto = req.body as CreateUserDto
        const user = this.usersService.create(userData)

        return resJSON(res, 201, {
            success: true,
            message: "User created successfully",
            data: user,
            timestamp: Date.now().toString()
        })
    }

    @Get("/:id")
    getUser(req: Request, res: ServerResponse): void {
        const user = this.usersService.findById(Number(req.params.id))

        return resJSON(res, 200, {
            success: true,
            message: "Users fetched successfully",
            data: user,
            timestamp: Date.now().toString()
        })
    }
}
