/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import SideBar from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  deleteUserById,
  getUserById,
  updateUserService,
} from "@/services/userService";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  interface User {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    password: string;
    confirmPassword: string;
  }
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<{ id: string }>(token);
      setUserId(decodedToken.id);
    }
    fetchUser();
  }, [userId]);

  // useEffect(() => {
  const fetchUser = async () => {
    try {
      const user = await getUserById(userId);
      setUser(user);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  // fetchUser();
  // }, [userId]);
  const handleUpdateUser = async () => {
    try {
      if (!user) return;

      const password = (document.getElementById("password") as HTMLInputElement)
        ?.value;
      const confirmPassword = (
        document.getElementById("confirm-password") as HTMLInputElement
      )?.value;

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await updateUserService(userId, {
        firstName:
          (document.getElementById("firstname") as HTMLInputElement)?.value ||
          "",
        lastName:
          (document.getElementById("lastname") as HTMLInputElement)?.value ||
          "",
        email:
          (document.getElementById("email") as HTMLInputElement)?.value || "",
        password:
          (document.getElementById("password") as HTMLInputElement)?.value ||
          "",
        confirmPassword:
          (document.getElementById("confirmPassword") as HTMLInputElement)
            ?.value || "",
      });
      alert("User updated successfully");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error: any) {
      console.error("Failed to update user", error);
      alert(error.message);
    }
  };
  const handleDeleteUser = async () => {
    try {
      if (!user) return;
      const confirmed = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (!confirmed) return;

      await deleteUserById(userId);

      alert("User deleted successfully");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error: any) {
      console.error("Failed to delete user", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="grid min-h-screen w-full grid-cols-[240px_1fr] overflow-hidden">
        <SideBar />
        <div className="flex flex-col   px-40">
          <header className="flex h-14 items-center justify-between border-b px-96 bg-gray-100/40 dark:bg-gray-800/40">
            <h1 className="text-lg font-semibold ">Profile</h1>
          </header>
          <main className="flex-1 p-6">
            <div className="mx-auto grid max-w-3xl gap-8">
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage alt="@shadcn" src="/assets/avatar.png" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <h2 className="text-xl font-semibold">
                      {`${user?.firstName}
                      ${user?.lastName}`}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="grid gap-5">
                  <Label htmlFor="name">First Name</Label>
                  <Input defaultValue={user?.firstName} id="firstname" />
                </div>
                <div className="grid gap-5">
                  <Label htmlFor="name">Last Name</Label>
                  <Input defaultValue={user?.lastName} id="lastname" />
                </div>

                <div className="grid gap-5">
                  <Label htmlFor="email">Email</Label>
                  <Input defaultValue={user?.email} id="email" type="email" />
                </div>
              </div>
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="grid gap-5">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <div className="flex justify-end gap-5">
                <Button
                  className="bg-red-500 text-white"
                  onClick={handleDeleteUser}>
                  Delete Account
                </Button>
                <Button variant="outline" onClick={handleUpdateUser}>
                  Save Changes
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
