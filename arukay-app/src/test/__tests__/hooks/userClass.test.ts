import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UserService } from '../../../hooks/userClass'
import type { IUserRepository } from '../../../services/userService'
import type { User, UserResponse } from '../../../types/user'
import { mockUserRepository, mockUser, mockUserResponse } from '../../__mocks__/userService'

describe('UserService', () => {
  let userService: UserService
  let mockRepository: IUserRepository

  beforeEach(() => {
    mockRepository = mockUserRepository
    userService = new UserService(mockRepository)
    vi.clearAllMocks()
  })

  describe('createUser', () => {
    it('debe crear usuario exitosamente', async () => {
      mockRepository.createUser.mockResolvedValue(mockUserResponse)

      const result = await userService.createUser(mockUser)

      expect(mockRepository.createUser).toHaveBeenCalledWith(mockUser)
      expect(result).toEqual(mockUserResponse)
    })

    it('debe manejar errores al crear usuario', async () => {
      const error = new Error('Error al crear usuario')
      mockRepository.createUser.mockRejectedValue(error)

      await expect(userService.createUser(mockUser)).rejects.toThrow('Error al crear usuario')
      expect(mockRepository.createUser).toHaveBeenCalledWith(mockUser)
    })
  })

  describe('getUsers', () => {
    it('debe obtener usuarios exitosamente', async () => {
      const mockUsers: UserResponse[] = [mockUserResponse]
      mockRepository.getUsers.mockResolvedValue(mockUsers)

      const result = await userService.getUsers()

      expect(mockRepository.getUsers).toHaveBeenCalled()
      expect(result).toEqual(mockUsers)
    })

    it('debe manejar errores al obtener usuarios', async () => {
      const error = new Error('Error al obtener usuarios')
      mockRepository.getUsers.mockRejectedValue(error)

      await expect(userService.getUsers()).rejects.toThrow('Error al obtener usuarios')
      expect(mockRepository.getUsers).toHaveBeenCalled()
    })
  })

  describe('deleteUser', () => {
    it('debe eliminar usuario exitosamente', async () => {
      mockRepository.deleteUser.mockResolvedValue(undefined)

      await userService.deleteUser(1)

      expect(mockRepository.deleteUser).toHaveBeenCalledWith(1)
    })

    it('debe manejar errores al eliminar usuario', async () => {
      const error = new Error('Error al eliminar usuario')
      mockRepository.deleteUser.mockRejectedValue(error)

      await expect(userService.deleteUser(1)).rejects.toThrow('Error al eliminar usuario')
      expect(mockRepository.deleteUser).toHaveBeenCalledWith(1)
    })
  })

  describe('Inyección de dependencias', () => {
    it('debe usar el repositorio inyectado', () => {
      const customRepository: IUserRepository = {
        createUser: vi.fn(),
        getUsers: vi.fn(),
        deleteUser: vi.fn(),
      }

      const service = new UserService(customRepository)

      expect(service).toBeInstanceOf(UserService)
    })
  })
}) 