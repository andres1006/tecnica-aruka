import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUserForm } from '../../../hooks/useUserForm'
import { UserService } from '../../../hooks/userClass'
import { mockUser, mockUserResponse } from '../../__mocks__/userService'

// Mock del UserService
vi.mock('../../../hooks/userClass')
vi.mock('../../../services/userService', () => ({
  userRepository: {
    createUser: vi.fn(),
    getUsers: vi.fn(),
    deleteUser: vi.fn(),
  }
}))

describe('useUserForm', () => {
  let mockService: UserService

  beforeEach(() => {
    vi.clearAllMocks()

    mockService = {
      createUser: vi.fn(),
      getUsers: vi.fn(),
      deleteUser: vi.fn(),
    } as unknown as UserService

    vi.mocked(UserService).mockImplementation(() => mockService)
  })

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', async () => {
      vi.mocked(mockService.getUsers).mockResolvedValue([])

      const { result } = renderHook(() => useUserForm())

      // Esperar a que se complete la carga inicial
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(result.current.users).toEqual([])
      expect(result.current.formData).toEqual({
        name: '',
        email: '',
        birthDate: ''
      })
      expect(result.current.errors).toEqual({})
      expect(result.current.isSubmitting).toBe(false)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.apiError).toBe(null)
    })
  })

  describe('handleInputChange', () => {
    it('debe actualizar el campo del formulario', () => {
      const { result } = renderHook(() => useUserForm())

      act(() => {
        result.current.handleInputChange('name', 'Nuevo Nombre')
      })

      expect(result.current.formData.name).toBe('Nuevo Nombre')
    })

    it('debe limpiar errores del campo cuando se modifica', () => {
      const { result } = renderHook(() => useUserForm())

      // Simular error previo
      act(() => {
        result.current.handleInputChange('name', '')
      })

      // Modificar el campo
      act(() => {
        result.current.handleInputChange('name', 'Nuevo Nombre')
      })

      expect(result.current.errors.name).toBeUndefined()
    })

    it('debe limpiar errores de API cuando se modifica el formulario', () => {
      const { result } = renderHook(() => useUserForm())

      // Simular error de API previo
      act(() => {
        result.current.handleInputChange('name', '')
      })

      // Modificar el campo
      act(() => {
        result.current.handleInputChange('name', 'Nuevo Nombre')
      })

      expect(result.current.apiError).toBe(null)
    })
  })

  describe('handleSubmit', () => {
    it('debe crear usuario exitosamente con datos válidos', async () => {
      vi.mocked(mockService.createUser).mockResolvedValue(mockUserResponse)

      const { result } = renderHook(() => useUserForm())

      // Llenar formulario
      act(() => {
        result.current.handleInputChange('name', mockUser.name)
        result.current.handleInputChange('email', mockUser.email)
        result.current.handleInputChange('birthDate', mockUser.birthDate)
      })

      // Simular envío
      await act(async () => {
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
        await result.current.handleSubmit(mockEvent)
      })

      expect(mockService.createUser).toHaveBeenCalledWith({
        name: mockUser.name,
        email: mockUser.email,
        birthDate: mockUser.birthDate
      })
      expect(result.current.users).toContain(mockUserResponse)
    })

    it('debe manejar errores de API al crear usuario', async () => {
      const error = new Error('Error de API')
      vi.mocked(mockService.createUser).mockRejectedValue(error)

      const { result } = renderHook(() => useUserForm())

      // Llenar formulario
      act(() => {
        result.current.handleInputChange('name', mockUser.name)
        result.current.handleInputChange('email', mockUser.email)
        result.current.handleInputChange('birthDate', mockUser.birthDate)
      })

      // Simular envío
      await act(async () => {
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
        await result.current.handleSubmit(mockEvent)
      })

      expect(result.current.apiError).toBe('Error de API')
    })
  })

  describe('removeUser', () => {
    it('debe eliminar usuario exitosamente', async () => {
      vi.mocked(mockService.deleteUser).mockResolvedValue(undefined)

      const { result } = renderHook(() => useUserForm())

      // Simular usuarios existentes
      act(() => {
        result.current.users = [mockUserResponse]
      })

      await act(async () => {
        await result.current.removeUser(1)
      })

      expect(mockService.deleteUser).toHaveBeenCalledWith(1)
      expect(result.current.users).toEqual([])
    })

    it('debe manejar errores de API al eliminar usuario', async () => {
      const error = new Error('Error al eliminar')
      vi.mocked(mockService.deleteUser).mockRejectedValue(error)

      const { result } = renderHook(() => useUserForm())

      await act(async () => {
        await result.current.removeUser(1)
      })

      expect(result.current.apiError).toBe('Error al eliminar')
    })
  })

  describe('loadUsers', () => {
    it('debe cargar usuarios exitosamente', async () => {
      const mockUsers = [mockUserResponse]
      vi.mocked(mockService.getUsers).mockResolvedValue(mockUsers)

      const { result } = renderHook(() => useUserForm())

      await act(async () => {
        await result.current.loadUsers()
      })

      expect(mockService.getUsers).toHaveBeenCalled()
      expect(result.current.users).toEqual(mockUsers)
    })

    it('debe manejar errores al cargar usuarios', async () => {
      const error = new Error('Error al cargar')
      vi.mocked(mockService.getUsers).mockRejectedValue(error)

      const { result } = renderHook(() => useUserForm())

      await act(async () => {
        await result.current.loadUsers()
      })

      expect(result.current.apiError).toBe('Error al cargar')
    })
  })

  describe('Validación de formulario', () => {
    it('debe validar nombre requerido', async () => {
      const { result } = renderHook(() => useUserForm())

      // Llenar formulario sin nombre
      act(() => {
        result.current.handleInputChange('email', 'test@example.com')
        result.current.handleInputChange('birthDate', '1990-01-01')
      })

      await act(async () => {
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
        await result.current.handleSubmit(mockEvent)
      })

      // Verificar que no se llamó al servicio porque hay errores de validación
      expect(mockService.createUser).not.toHaveBeenCalled()
    })

    it('debe validar email válido', async () => {
      const { result } = renderHook(() => useUserForm())

      // Llenar formulario con email inválido
      act(() => {
        result.current.handleInputChange('name', 'Test User')
        result.current.handleInputChange('email', 'email-invalido')
        result.current.handleInputChange('birthDate', '1990-01-01')
      })

      await act(async () => {
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
        await result.current.handleSubmit(mockEvent)
      })

      // Verificar que no se llamó al servicio porque hay errores de validación
      expect(mockService.createUser).not.toHaveBeenCalled()
    })

    it('debe validar fecha de nacimiento requerida', async () => {
      const { result } = renderHook(() => useUserForm())

      // Llenar formulario sin fecha
      act(() => {
        result.current.handleInputChange('name', 'Test User')
        result.current.handleInputChange('email', 'test@example.com')
      })

      await act(async () => {
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
        await result.current.handleSubmit(mockEvent)
      })

      // Verificar que no se llamó al servicio porque hay errores de validación
      expect(mockService.createUser).not.toHaveBeenCalled()
    })
  })

  describe('Manejo de errores', () => {
    it('debe manejar errores de ApiException', async () => {
      const apiError = { message: 'Error de API', status: 400 }
      vi.mocked(mockService.createUser).mockRejectedValue(apiError)

      const { result } = renderHook(() => useUserForm())

      act(() => {
        result.current.handleInputChange('name', mockUser.name)
        result.current.handleInputChange('email', mockUser.email)
        result.current.handleInputChange('birthDate', mockUser.birthDate)
      })

      await act(async () => {
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
        await result.current.handleSubmit(mockEvent)
      })

      expect(result.current.apiError).toBe('Error de API')
    })

    it('debe manejar errores genéricos', async () => {
      const error = new Error('Error genérico')
      vi.mocked(mockService.createUser).mockRejectedValue(error)

      const { result } = renderHook(() => useUserForm())

      act(() => {
        result.current.handleInputChange('name', mockUser.name)
        result.current.handleInputChange('email', mockUser.email)
        result.current.handleInputChange('birthDate', mockUser.birthDate)
      })

      await act(async () => {
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
        await result.current.handleSubmit(mockEvent)
      })

      expect(result.current.apiError).toBe('Error genérico')
    })

    it('debe manejar errores desconocidos', async () => {
      vi.mocked(mockService.createUser).mockRejectedValue('Error desconocido')

      const { result } = renderHook(() => useUserForm())

      act(() => {
        result.current.handleInputChange('name', mockUser.name)
        result.current.handleInputChange('email', mockUser.email)
        result.current.handleInputChange('birthDate', mockUser.birthDate)
      })

      await act(async () => {
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
        await result.current.handleSubmit(mockEvent)
      })

      expect(result.current.apiError).toBe('Error desconocido')
    })
  })
}) 