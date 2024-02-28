import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/, { message: "Name must contain only letters." }),
  lastName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/, { message: "Name must contain only letters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .regex(/[0-9]/, { message: "Password must contain at least one digit." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character.",
    }),
  confirmPassword: z.string(),
});