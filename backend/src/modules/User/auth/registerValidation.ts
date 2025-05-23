import {z} from "zod"

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    ['confirm-password']: z.string()

}).refine((data)=> data.password === data['confirm-password'],{
    message: "Las contraseñas no coinciden",
    path: ['confirm-password'],
});

