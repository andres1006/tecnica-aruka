import { vi } from 'vitest'
import type { User, UserResponse } from '../../types/user'
import type { IUserRepository } from '../../services/userService'

// Mock del repositorio con funciones mockeadas correctamente
export const mockUserRepository: IUserRepository = {
  createUser: vi.fn(),
  getUsers: vi.fn(),
  deleteUser: vi.fn(),
}

// Datos de prueba
export const mockUsers: UserResponse[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    birth_date: '1990-01-01',
    created_at: '2024-01-01T00:00:00Z',
    age: 34
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    birth_date: '1985-05-15',
    created_at: '2024-01-02T00:00:00Z',
    age: 39
  }
]

export const mockUser: User = {
  name: 'Nuevo Usuario',
  email: 'nuevo@example.com',
  birthDate: '1995-12-25'
}

export const mockUserResponse: UserResponse = {
  id: 3,
  name: 'Nuevo Usuario',
  email: 'nuevo@example.com',
  birth_date: '1995-12-25',
  created_at: '2024-01-03T00:00:00Z',
  age: 29
}

// Configurar mocks por defecto
export const setupUserServiceMocks = () => {
  mockUserRepository.getUsers.mockResolvedValue(mockUsers)
  mockUserRepository.createUser.mockResolvedValue(mockUserResponse)
  mockUserRepository.deleteUser.mockResolvedValue(undefined)
}

// Limpiar mocks
export const clearUserServiceMocks = () => {
  vi.clearAllMocks()
} 