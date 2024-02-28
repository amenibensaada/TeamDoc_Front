// Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginSchema } from "../dto/loginDto";
import { z } from "zod";

import email_icon from "../../assets/img/email.png";
import password_icon from "../../assets/img/password.png";
import signup_icon from "../../assets/img/aziz3.jpg";
import logo from "../../assets/img/logo.png";
import google_icon from "../../assets/img/login3.png";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/LoginUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(true);
  const navigate = useNavigate();

  const handleChangeEmail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isFormValid = email !== "" && password !== "";
  const mutation = useMutation({
    mutationFn: (body: z.infer<typeof loginSchema>) => loginUser(body),
    onSuccess: () => {
      console.log("User created successfully");
      setErrors({});
      navigate("/signup");
    },
  });
  const handleSubmit = () => {
    setIsSubmitted(true);

    if (isFormValid) {
      const userData = {
        email: email.trim(),
        password: password.trim(),
      };

      try {
        loginSchema.parse(userData);
        mutation.mutate(userData);
        console.log("Form data:", userData);
        setErrors({});
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: { [key: string]: string } = {};
          error.errors.forEach((err) => {
            fieldErrors[err.path[0] as string] = err.message;
          });
          setErrors(fieldErrors);
        }
      }
    }
  };

  const errorMessage = !isFormValid && isSubmitted && (
    <div className="error">Please fill in all the required fields.</div>
  );

  const buttonClass = `submit ${!isFormValid && isSubmitted ? "disabled" : ""}`;

  return (
    <>
      <div className="container ">
        <div className="left-half">
          <div className="header">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "200px", height: "auto" }}
            />
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            {errors.email && <div className="error">{errors.email}</div>}
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <div className="header">
              <div className="text2">OR</div>
              <div className="underline"></div>
              <Link to="/login" className="d">
                <img src={google_icon} alt="Google Icon" />
              </Link>
            </div>
          </div>
          <div className="forgot-password">
            Lost password ? <span>Click here !</span>
          </div>
          <div className="submit-container">
            <Link
              to="/signup"
              className={`submit1 ${isFormValid ? "" : "disabled"}`}>
              Sign up
            </Link>
            <div
              className={buttonClass}
              onClick={isFormValid ? handleSubmit : null}
              style={
                !isFormValid && isSubmitted ? { cursor: "not-allowed" } : {}
              }>
              Login
            </div>
          </div>
          {errorMessage}
        </div>
        <div className="right-half">
          <img src={signup_icon} alt="Profile" />
        </div>
      </div>
    </>
  );
}
