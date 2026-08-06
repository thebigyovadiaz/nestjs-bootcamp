import { User } from "../../interfaces";
import { USER_REPOSITORY } from "../../container/tokens";
import { IUserRepository } from "../contracts/user.repository";

export class MemoryUserRepository implements IUserRepository {
    private users: User[] = [];
    findAll(): User[] {
        return this.users.map(user => ({ ...user }))
    }

    findById(id: Number): User | undefined {
        return this.users.find(res => (res.id === id))
    }

    findByEmail(email: String): User | undefined {
        return this.users.find(res => (res.email === email))
    }

    create(user: User): User {
        this.users.push(user)
        return user
    }

    update(id: number, data: Partial<User>): User | undefined {
        this.users.forEach((v, k) => {
            if (v.id === id) {
                this.users[k] = { ...v, ...data }
            }
        })

        return this.findById(id)
    }

    delete(id: Number): User[] {
        const res = this.users.filter(user => user.id !== id)
        return res
    }

    generateId(): number {
        return this.users.length + 1
    }
}
