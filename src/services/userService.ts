import { z } from "zod";
import { signupSchema } from "../pages/dto/createUserDto";

export const createUser = async (
  createUserDto: z.infer<typeof signupSchema>
) => {
  const response = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createUserDto),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
};
