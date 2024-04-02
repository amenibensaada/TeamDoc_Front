export const loginUser = async (loginUserDto: any) => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginUserDto),
  });
  if (!response.ok) {
    throw new Error("Failed to login user");
  }
  return response.json();
};
export const loginWithGoogle = async (loginUserDto: any) => {
  const response = await fetch("http://localhost:3000/auth/loginWithGoogle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginUserDto),
  });
  if (!response.ok) {
    throw new Error("Failed to login user");
  }
  return response.json();
};
