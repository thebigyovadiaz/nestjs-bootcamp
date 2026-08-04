import { User } from "../interfaces";
import { CreateUserDto } from "../dto/create-user.dto";

const users: User[] = [
    {
        id: 1,
        name: "User First",
        email: "test1@gmail.com",
        password: "123456",
        createdAt: Date.now().toString(),
        isActive: true
    }
]

export const usersRepository = {
    generateId(): number {
        return users.length + 1
    },
    findAll(): User[] {
        return users.map(user => ({ ...user }))
    },
    findById(id: Number): User | undefined {
        return users.find(res => (res.id === id))
    },
    findByEmail(email: String): User | undefined {
        return users.find(res => (res.email === email))
    },
    create(user: User): Boolean {
        users.push(user)
        return true
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
