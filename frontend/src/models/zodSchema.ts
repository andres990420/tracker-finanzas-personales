import {z} from "zod"

export const schema = z.object({
    email: z.string().email('El correo es obligatorio'),
    password: z.string().min(6,'La contrase;a debe tener al menos 6 caracteres'),
    ['confirm-password']: z.string().min(6, 'La contrase;a debe tener al menos 6 caracteres')

}).refine((data)=> data.password === data['confirm-password'],{
    message: "Las contraseñas son invalidas",
    path: ['confirm-password'],
});