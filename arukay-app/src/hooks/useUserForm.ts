import { useState, useEffect, useCallback, useMemo } from 'react'
import { userSchema, type User, type UserResponse, type UserErrors } from '../types/user'
import { UserService } from './userClass'
import { userRepository } from '../services/userService'

export const useUserForm = () => {
  const service = useMemo(() => new UserService(userRepository), [])
  const [users, setUsers] = useState<UserResponse[]>([])
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    birthDate: ''
  })
  const [errors, setErrors] = useState<UserErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true)
      setApiError(null)
      const usersData = await service.getUsers()
      setUsers(usersData || [])
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }, [service])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const validateForm = (data: User): UserErrors => {
    try {
      userSchema.parse(data)
      return {}
    } catch {
      const fieldErrors: UserErrors = {}

      // Validación manual simple
      if (!data.name || data.name.trim() === '') {
        fieldErrors.name = 'El nombre es requerido'
      }

      if (!data.email || data.email.trim() === '') {
        fieldErrors.email = 'El email es requerido'
      } else if (!data.email.includes('@')) {
        fieldErrors.email = 'El email debe ser válido'
      }

      if (!data.birthDate || data.birthDate.trim() === '') {
        fieldErrors.birthDate = 'La fecha de nacimiento es requerida'
      }

      return fieldErrors
    }
  }

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }

    if (apiError) {
      setApiError(null)
    }
  }

  const handleApiError = (error: unknown) => {
    if (error && typeof error === 'object' && 'message' in error) {
      setApiError(error.message as string)
    } else if (error instanceof Error) {
      setApiError(error.message)
    } else {
      setApiError('Error desconocido')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setApiError(null)

    const validationErrors = validateForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        const newUser = await service.createUser(formData)

        setUsers(prev => [...(prev || []), newUser])

        setFormData({
          name: '',
          email: '',
          birthDate: ''
        })

        setErrors({})
      } catch (error) {
        handleApiError(error)
      }
    }

    setIsSubmitting(false)
  }

  const removeUser = async (id: number) => {
    try {
      setApiError(null)
      await service.deleteUser(id)
      setUsers(prev => (prev || []).filter(user => user.id !== id))
    } catch (error) {
      handleApiError(error)
    }
  }

  return {
    users,
    formData,
    errors,
    isSubmitting,
    isLoading,
    apiError,
    handleInputChange,
    handleSubmit,
    removeUser,
    loadUsers
  }
} 