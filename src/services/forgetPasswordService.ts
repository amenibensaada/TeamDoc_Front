import { z } from "zod";
import { forgetPasswordSchema } from "../pages/dto/forgetPasswordDto";

export const forgetPassword = async (
  forgetPasswordData: z.infer<typeof forgetPasswordSchema>
) => {
  const response = await fetch("http://localhost:3000/auth/forgetPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(forgetPasswordData),
  });
  if (!response.ok) {
    throw new Error("Failed to initiate password reset");
  }
  return response.json();
};
