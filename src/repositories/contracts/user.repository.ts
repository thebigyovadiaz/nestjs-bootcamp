import { User } from "../../interfaces";

export interface IUserRepository {
  findAll(): User[];
  findById(id: number): User | undefined;
  findByEmail(email: string): User | undefined;
  create(user: User): User;
  generateId(): number;
  update(id: number, data: Partial<User>): User | undefined
  delete(id: number): User[]
}
