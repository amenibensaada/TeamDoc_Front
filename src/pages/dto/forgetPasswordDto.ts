import { z } from "zod";

// Schéma de validation pour l'email de réinitialisation de mot de passe
export const forgetPasswordSchema = z.object({
  email: z.string().email(),
  


});
