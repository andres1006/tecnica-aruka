import type { IUserRepository } from "../services/userService"
import type { User, UserResponse } from "../types/user"

export interface IUserService {
  createUser(user: User): Promise<UserResponse>
  getUsers(): Promise<UserResponse[]>
  deleteUser(id: number): Promise<void>
}

export class UserService implements IUserService {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  async createUser(user: User): Promise<UserResponse> {
    return await this.repository.createUser(user)
  }

  async getUsers(): Promise<UserResponse[]> {
    return await this.repository.getUsers()
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.deleteUser(id)
  }

}