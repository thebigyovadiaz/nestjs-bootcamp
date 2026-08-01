import { User } from "../interfaces";
import { CreateUserDto } from "../interfaces/dto";

const users: User[] = [
    {
        name: "User First",
        id: 1,
        email: "test1@gmail.com",
        createdAt: Date.now().toString(),
        isActive: true
    },
    {
        name: "User Second",
        id: 2,
        email: "test2@gmail.com",
        createdAt: Date.now().toString(),
        isActive: true
    },
    {
        name: "User Third",
        id: 3,
        email: "test3@gmail.com",
        createdAt: Date.now().toString(),
        isActive: true
    },
    {
        name: "User Fourth",
        id: 4,
        email: "test4@gmail.com",
        createdAt: Date.now().toString(),
        isActive: true
    },
    {
        name: "User Fiveth",
        id: 5,
        email: "test5@gmail.com",
        createdAt: Date.now().toString(),
        isActive: true
    }
]

export const usersRepository = {
    findAll(): User[] {
        return users.map(user => ({ ...user }))
    },
    findById(id: Number): User | undefined {
        return users.find(res => (res.id === id))
    },
    findByEmail(email: String): User | undefined {
        return users.find(res => (res.email === email))
    },
    create(user: CreateUserDto): Number {
        const id = users.length + 1
        users.push({
            name: user.name,
            id,
            email: user.email,
            createdAt: Date.now().toString(),
            isActive: true
        })

        return id
    },
    update(id: Number, data: Partial<User>): User | undefined {
        users.forEach((v, k) => {
            if (v.id === id) {
                users[k] = { ...v, ...data }
            }
        })

        return this.findById(id)
    },
    delete(id: Number): User[] {
        const res = users.filter(user => user.id !== id)
        return res
    }
}
