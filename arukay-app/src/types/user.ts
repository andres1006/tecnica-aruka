import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('El email debe ser válido'),
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida')
})

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  birth_date: z.string(),
  created_at: z.string(),
  age: z.number()
})

export type User = z.infer<typeof userSchema>
export type UserResponse = z.infer<typeof userResponseSchema>
export type UserErrors = Partial<Record<keyof User, string>> 