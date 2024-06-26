export const createUser = async (createUserDto: any) => {
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
export const getUserById = async (userId: string) => {
  const response = await fetch(`http://localhost:3000/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
};
export const updateUserService = async (id: string, createUserDto: any) => {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createUserDto),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
};
export const deleteUserById = async (userId: string) => {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};
