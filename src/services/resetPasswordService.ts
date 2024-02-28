
import { z } from "zod";
import { resetPasswordSchema } from "../pages/dto/resetPasswordDto";

export const resetPassword = async (
  resetPasswordData: z.infer<typeof resetPasswordSchema>,
  token: string

) => {
  const url = `http://localhost:3000/auth/resetPassword?token=${token}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetPasswordData),
  });
  if (!response.ok) {
    throw new Error("Failed to initiate password reset");
  }
  return response.json();
};
