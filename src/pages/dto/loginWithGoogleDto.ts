// loginSchema.ts
import { z } from "zod";

export const loginWithGoogleDTO = z.object({
  googleUuid: z.string(),
});
