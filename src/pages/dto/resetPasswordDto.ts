import { z } from "zod";

// Schéma de validation pour la réinitialisation de mot de passe
export const resetPasswordSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string(),
  token: z.string(),
});
