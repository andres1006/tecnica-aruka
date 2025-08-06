import { apiService, type ApiResponse } from './api'
import { type User, type UserResponse } from '../types/user'

export interface IUserRepository {
  createUser(user: User): Promise<UserResponse>
  getUsers(): Promise<UserResponse[]>
  deleteUser(id: number): Promise<void>
}

export class UserRepository implements IUserRepository {
  private readonly baseUrl = '/users'

  async createUser(user: User): Promise<UserResponse> {
    const userData = {
      name: user.name,
      email: user.email,
      birth_date: user.birthDate
    }

    const response: ApiResponse<UserResponse> = await apiService.post<UserResponse>(
      this.baseUrl,
      userData
    )

    return response.data
  }

  async getUsers(): Promise<UserResponse[]> {
    const response: ApiResponse<UserResponse[]> = await apiService.get<UserResponse[]>(
      this.baseUrl
    )

    return response.data
  }

  async deleteUser(id: number): Promise<void> {
    await apiService.delete<void>(`${this.baseUrl}/${id}`)
  }
}

export const userRepository = new UserRepository() 