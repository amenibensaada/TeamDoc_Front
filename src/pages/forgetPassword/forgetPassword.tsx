import React, { useState } from "react";
import "./Password.css";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../services/forgetPasswordService";
import { useMutation } from "@tanstack/react-query";
import { forgetPasswordSchema } from "../dto/forgetPasswordDto";
import { z } from "zod";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (body: z.infer<typeof forgetPasswordSchema>) =>
      forgetPassword(body),
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = { email: email.trim() };
      forgetPasswordSchema.parse(userData);
      const response = await mutation.mutateAsync(userData);
      console.log("mail sent successfully", response);
      setSuccessMessage("Email sent successfully");
      setEmail("");
      setErrorMessage("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message);
      }
    }
  };

  return (
    <div className="container">
      <div className="left-half">
        <div className="header">
          <div className="text">Forget Password</div>
          <div className="underline"></div>
        </div>
        <div className="frame">
          <div className="inputs">
            {errorMessage && (
              <div className="text-red-500 mb-2">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-green-500 mb-2">{successMessage}</div>
            )}
            <form onSubmit={handleFormSubmit}>
              <div className="input">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex items-center">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 font-light text-gray-500 dark:text-gray-300">
                  I accept the{" "}
                  <Link
                    to="/conditions"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <div className="submit-container">
                <button type="submit" className="submit1">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="right-half">
        <img src="/Fo.svg" alt="Password Reset" className="password-image" />
      </div>
    </div>
  );
}
