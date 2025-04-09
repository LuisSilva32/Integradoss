import { z } from 'zod'

// Esquema de validación para el formulario de inicio de sesión
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'El usuario es obligatorio' })
    .email({ message: 'Debe ser un correo electrónico válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .max(100, { message: 'La contraseña no puede exceder los 100 caracteres' })
})
